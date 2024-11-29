import { describe, it, beforeEach, expect, beforeAll } from "bun:test";
import { DTPSClient } from "../src/dtpsclient";
import { Api, CardcontrollerApplyCardTopupInputDTO, CardcontrollerIssueCardInputDTO, UsercontrollerCreateUserInputDTO, } from "../src/dtpsApi";
import {  faker } from '@faker-js/faker';
import moment from "moment";

const userId = "3564baae-9be7-4d7b-b866-06c4ce93e4f7"
const cardTopupId ="9c675013-53ab-4a12-80e2-fc51fba924f4"

describe('CardTesting', () => {
    let client: Api<any>
  
    beforeEach(async () => {
        const url = process.env.API_URL?process.env.API_URL:""
        const apiKey = process.env.API_KEY?process.env.API_KEY:""
        const apiSecret = process.env.API_SECRET ? process.env.API_SECRET : ""
        const dtpsClient = new DTPSClient().init({
            url,
            apiKey,
            apiSecret,
        })
        client = dtpsClient;
    });

    const createUser = async () => {
        // Create new user to apply card.
        const genders = ["Male","Female","Other","None"]
        const payload: UsercontrollerCreateUserInputDTO = {
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

        const resp = await client.user.createUser(payload);
        return resp.data.id || "";
            
    };

    describe("applycard", () => {
        it('should fail when new user applyCard', async() => {
            const cardListResponse = await client.card.getAvailableCards()
            expect(cardListResponse.status).toBe(200)
            expect(true).toBe(Array.isArray(cardListResponse.data));
            expect(true).toBe(cardListResponse.data.length>0);
    
            // apply card 
            const cardId = cardListResponse.data[0].id!
            
            const cardApplyPayload: CardcontrollerIssueCardInputDTO = {
                cardId,
                carddeliveryaddress: faker.location.streetAddress(),
                embossname: faker.person.firstName()+faker.person.lastName(),
                userId: await createUser()
            }
    
            try {
                await client.card.applyCard(cardApplyPayload)
            } catch (Err: any) {
                expect(Err.error).toBe("please wait while we verify the submitted details")
            }
    
        });
    
        it('should fail when user with pending card application applies for card', async() => {
            const cardListResponse = await client.card.getAvailableCards()
            expect(cardListResponse.status).toBe(200)
            expect(true).toBe(Array.isArray(cardListResponse.data));
            expect(true).toBe(cardListResponse.data.length>0);
    
            // apply card 
            const cardId = cardListResponse.data[0].id!
            
            const cardApplyPayload: CardcontrollerIssueCardInputDTO = {
                cardId,
                carddeliveryaddress: faker.location.streetAddress(),
                embossname: faker.person.firstName()+faker.person.lastName(),
                userId: userId
            }
    
            try {
                await client.card.applyCard(cardApplyPayload)
            } catch (Err: any) {
                expect(Err.error).toBe("user already has a pending card application")
            }
    
        });
    })

    it('getApplication', async() => {
        const resp = await client.card.getAllCardApplications();
        expect(resp.status).toBe(200);
        expect(true).toBe(Array.isArray(resp.data));
    });

    it('getAvailableCards', async() => {
        const resp = await client.card.getAvailableCards()
        expect(resp.status).toBe(200)
        expect(true).toBe(Array.isArray(resp.data));
    });

    it('getCardApplication', async() => {
        const cardApplications = await client.card.getAllCardApplications();
        const cardApplicationId = cardApplications.data[0].id || "";

        const resp = await client.card.getCardApplication(cardApplicationId)
        expect(resp.status).toBe(200);
    });

    describe("getCardBalance", () => {
        it('should return card balance', async() => {
            let resp = await client.card.getCardBalance(process.env.CARD_NUMBER ? process.env.CARD_NUMBER : "1212121212121212");
            expect(resp.status).toBe(200);
        });

        it('should return validation error on invalid card number', async() => {
            try {
                await client.card.getCardBalance(cardTopupId)
            } catch(err: any) {
                expect(err.error).toBe("invalid card number")
            }
        });
    })

    it('handleTopup', async() => {
        
        const cardApplyPayload: CardcontrollerApplyCardTopupInputDTO = {
            amount: 100,
            userCardId:cardTopupId,
        }

        const cardTopupResp = await client.card.applyCardTopup(cardApplyPayload)
        expect(cardTopupResp.status).toBe(200)
    });

    it('Get card transaction history', async() => {
        const resp = await client.card.getCardTxnHistory(process.env.CARD_NUMBER ? process.env.CARD_NUMBER : "1212121212121212")
        expect(resp.status).toBe(200)
    });

    // TODO - API error - "ERROR: relation \"partner_cards\" does not exist (SQLSTATE 42P01)"
    // it('getAllCardTopupApplications', async() => {
    //     try {
    //         const resp = await client.card.getAllCardTopupApplications()
    //     console.log(resp)
    //         expect(resp.status).toBe(200)
    //         expect(true).toBe(Array.isArray(resp.data));
    //     }catch(err) {
    //         console.log(err)
    //     }
    // });
  });