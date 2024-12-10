import express from "express";
const historyRouter = express.Router();

// get all history => /history
historyRouter.get("/", (req, response) => {
  response.send("History list");
});

// history based on renter id
historyRouter.get("/:renterID", (req, response) => {});

// history based on owner id
historyRouter.get("/:ownerID", (req, response) => {});

// update renter payment history
historyRouter.patch("/updatePaymentHistory/:renterID", (req, response) => {});
export default historyRouter;
