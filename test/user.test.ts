import { describe, it, beforeEach, expect } from "bun:test";
import { DTPSClient } from "../src/dtpsclient";
import { Api, UsercontrollerCreateUserInputDTO, UsercontrollerDocumentInputDto, UsercontrollerUploadUserDocsInputDTO } from "../src/dtpsApi";
import {  faker } from '@faker-js/faker';
import moment from "moment";

const mockImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC"

describe('UserTesting (e2e)', () => {
    let client: Api<unknown>
  
    beforeEach(async () => {
        const url = process.env.API_URL?process.env.API_URL:""
        const apiKey =process.env.API_KEY?process.env.API_KEY:""
        const apiSecret = process.env.API_SECRET? process.env.API_SECRET:""
        const dtpsClient = new DTPSClient().init({
            url,
            apiKey,
            apiSecret,
        })
        client = dtpsClient;
    });
  
    it('getUsers', async() => {
        const resp = await client.user.getAllUsers()
        
        expect(resp.status).toBe(200)
        expect(true).toBe(Array.isArray(resp.data));
    });

    describe("createUser", () => {
        const genders = ["Male","Female","Other","None"]
        let payload: UsercontrollerCreateUserInputDTO = {
            birth_country: faker.location.countryCode(),
            district: faker.location.city(),
            dob: moment(faker.date.birthdate()).format("DD/MM/YYYY"),
            first_name: faker.person.firstName(),
            gender: genders[Math.floor(Math.random() * genders.length)],
            isd_code: 1,
            last_name: faker.person.lastName(),
            mail: faker.internet.email(),
            occupation: faker.person.jobTitle(),
            passportnumber: faker.vehicle.vin(),
            place_of_birth: faker.location.country(),
            province: faker.location.county(),
            telephone: faker.phone.number(),
            title: faker.person.jobTitle(),
            village: faker.location.county(),
        }

        it ('should create user', async () => {
            const resp = await client.user.createUser(payload);
            expect(resp.status).toBe(200);
        })

        it ('should return unique validation error on same email or passportnumber', async () => {
            try {
                await client.user.createUser(payload);
            } catch (err: any) {
                expect(err.error).toBe('user already exists')
            }
        })

        it ('should return validation error on invalid email', async () => {
            let params = Object.assign({}, payload, {mail: ""})
            try {
                await client.user.createUser(params);
            } catch (err: any) {
                expect(err.error).toBe('Email must be a valid email address')
            }
        })

        it ('should return validation error on invalid gender', async () => {
            let params = Object.assign({}, payload, {gender: "NA"})
            try {
                await client.user.createUser(params);
            } catch (err: any) {
                expect(err.error).toBe('Invalid Gender, only accepts Male, Female, Other, None')
            }
        })

        it ('should return validation error on invalid dob', async () => {
            let params = Object.assign({}, payload, {dob: moment(faker.date.birthdate()).format("DD-MM-YYYY")})
            try {
                await client.user.createUser(params);
            } catch (err: any) {
                expect(err.error).toBe('Dob must be in the format DD/MM/YYYY')
            }
        })
    });

    it('getPartnerUsers', async() => {
        const users = await client.user.getAllUsers();
        //@ts-ignore
        const userId = users.data[0].id;

        const resp = await client.user.getPartnerUser(userId)
        expect(resp.status).toBe(200);
    });

    describe("uploadDocuments", async () => {

        it('should upload documents', async () => {
            const userListResp = await client.user.getAllUsers()
            //@ts-ignore
            const oneUser = userListResp.data[0]
            const userId = oneUser.id

            const documents: UsercontrollerDocumentInputDto[] = []
            for (const docName of ["PASSPORT", "SIGNATURE", "SELFIE","SELFIE_WITH_PASSPORT"]) {
                documents.push({
                    docName,
                    base64data:mockImg
                })
            }
            const payload: UsercontrollerUploadUserDocsInputDTO = {
                userId,
                documents
            }

            const resp = await client.user.uploadUserDocuments(payload);

            expect(resp.status).toBe(200)

        });

        it('should return error on invalid documents name', async () => {
            try {
                const userListResp = await client.user.getAllUsers()
                //@ts-ignore
                const oneUser = userListResp.data[0]
                const userId = oneUser.id

                const documents: UsercontrollerDocumentInputDto[] = []
                for (const docName of ["PASSPORT", "SIGNATURE", "SELFIE","WITH_PASSPORT"]) {
                    documents.push({
                        docName,
                        base64data:mockImg
                    })
                }
                const payload: UsercontrollerUploadUserDocsInputDTO = {
                    userId,
                    documents
                }

                await client.user.uploadUserDocuments(payload);
            } catch(err: any) {
                expect(err.error).toBe("invalid document name error. system only supports PASSPORT, SIGNATURE, SELFIE, SELFIE_WITH_PASSPORT")
            }
        });
    });
  });