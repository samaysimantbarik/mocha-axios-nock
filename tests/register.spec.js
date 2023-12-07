import nock from "nock";
import axios from "axios";
import { getRegisterUserPayload } from "../models/index.js";
import { expect } from "chai";
import { BASE_URL } from "../constants/environmentConstants.js";
import { ENDPOINTS } from "../constants/index.js";


describe("Test suite", () => {
  it("Register Australia user - No Mock", async () => {
    const payload = getRegisterUserPayload({
      country: "AU",
      password: "Test@123",
      memberType: 1,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Payload", payload);
    const URL = BASE_URL + ENDPOINTS
    try {
      const response = await axios.post(URL, payload, config);
      console.log("status", response.status);
      console.log("responseJson", response.data);
      expect(response.data.data.msg).to.eql(
        `You have succesfully registered. Please login using your credentials. Your details are sent to  ${payload.email}`
      );
    } catch (error) {
      console.log("error", error.message);
    }
  });

  it("Register Nz user - Mock Post", async () => {
    const payload = getRegisterUserPayload({
      country: "NZ",
      password: "Test@123",
      memberType: 1,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("Payload", payload);

    const URL = BASE_URL + ENDPOINTS.REGISTER_NZ;
 // Nock is a library used for mocking HTTP requests. It is useful for testing and integration purposes.
    nock(BASE_URL)
      .post(ENDPOINTS.REGISTER_NZ)
      .reply(200, {
        data: {
          msg: `You have succesfully registered. Please login using your credentials. Your details are sent to  ${payload.email}`,
        },
        errors: [],
      });
    try {
      const response = await axios.post(URL, config, payload);
      console.log("responseJson", response.data);
      expect(response.data.data.msg).to.equal(
        `You have succesfully registered. Please login using your credentials. Your details are sent to  ${payload.email}`
      );
    } catch (error) {
      console.log("error", error.message);
    }
  });

  it("Another Mock - Get", async () => {
    console.log("Test passed");
    nock("https://api.example.com")
      .get("/data")
      .reply(200, { message: "Mocked response2" });

    const response = await axios.get("https://api.example.com/data");
    console.log("response", response.data);
  });
});
