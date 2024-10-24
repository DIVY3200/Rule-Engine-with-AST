import express from 'express';
import * as ruleController from '../controllers/ruleController.js';

const router = express.Router();

router.post('/create_rule', ruleController.createRule);
router.post('/combine_rules', ruleController.combineRules);
router.post('/evaluate_rule', ruleController.evaluateRule);

export default router;
