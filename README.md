**Application 1 : Rule Engine with AST**


**Objective:**
Develop a simple 3-tier rule engine application(Simple UI, API and Backend, Data) to determine
user eligibility based on attributes like age, department, income, spend etc.The system can use
Abstract Syntax Tree (AST) to represent conditional rules and allow for dynamic
creation,combination, and modification of these rules.


**Data Structure:**
● Define a data structure to represent the AST.
● The data structure should allow rule changes
● E,g One data structure could be Node with following fields
○ type: String indicating the node type ("operator" for AND/OR, "operand" for
conditions)
○ left: Reference to another Node (left child)
○ right: Reference to another Node (right child for operators)
○ value: Optional value for operand nodes (e.g., number for comparisons)


**Step to run the project:**

npm init

cd to project_name

Package need to Install: body-parser, dotenv, express, mongoose, cors, path

Use this in your git: npm i body-parser dotenv express mongoose cors path

**Make a Directory in your VS Code:**

Rule Engine/ 
│
├── controller/
│   └── ruleController.js
│
├── frontend/
│   └── index.html
|      └── styles.css  
|     └── index.js              
│
├── models/
│   └── Rule.js            
│
├── routes/
│   └── ruleRoutes.js 
│
├── utils/
│   └── ast.js 
│
├── .env
│   
└── server.js 

**Create .env file and use ypur
MONGO_URL=""**

**Test Case 1: Create a Rule with Valid Data**

Input:

**Test case for Create Rule**
Rule Name: Age Check
Rule String: age > 18

**Test case for Combine Rule**
Rule 1: Age Check
Operator: AND
Rule 2: Country Check

**Test Case for Evaluate Rule**
Rule: CombinedRule (condition: (age > 18) AND (country == 'US'))


**Create a Rule**

Endpoint: /api/create_rule
Method: POST
Request Body:
{
  "ruleString": "age > 18",
  "ruleName": "Age Check"
}

**Combine Rules**

Endpoint: /api/rules/combine_rules
Method: POST
Request Body:

**Evaluate a Rule**

Endpoint: /api/rules/evaluate_rule
Method: POST


**After your coding**

run a nodemon server.js OR node server.js
