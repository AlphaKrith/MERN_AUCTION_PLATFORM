import express from "express";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.js"
import { deleteAuctionItem, deletePaymentProof, fetchAllUser, getAllPaymentProofDetail, getAllPaymentProofs, monthlyRevenue, updateProofStatus } from "../controllers/superAdminController.js";

const router = express.Router();

router.delete("/auctionitem/delete/:id", isAuthenticated, isAuthorized("Super Admin"), deleteAuctionItem);
router.get("/paymentproofs/getall", isAuthenticated, isAuthorized("Super Admin"), getAllPaymentProofs);
router.get("/paymentproof/:id", isAuthenticated, isAuthorized("Super Admin"), getAllPaymentProofDetail);
router.put("/paymentproof/status/update/:id", isAuthenticated, isAuthorized("Super Admin"), updateProofStatus);
router.delete("/paymentproof/delete/:id", isAuthenticated, isAuthorized("Super Admin"), deletePaymentProof);

router.get("/users/getall", isAuthenticated, isAuthorized("Super Admin"), fetchAllUser)
router.get("/monthlyincome", isAuthenticated, isAuthorized("Super Admin"), monthlyRevenue);

export default router;
