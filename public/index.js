function generateTreeHTML(node, prefix = '', isLeft = true, last = true) {
    if (!node) return '';

    // Construct the correct prefixes for each node
    let treeHTML = prefix;
    treeHTML += last ? '└── ' : '├── ';
    treeHTML += node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`;
    treeHTML += '\n'; // Use newline for preformatted text

    // Update the prefix for the children
    prefix += last ? '    ' : '│   ';

    // Gather children nodes if they exist
    const children = [];
    if (node.left) children.push({ node: node.left, last: !node.right });
    if (node.right) children.push({ node: node.right, last: true });

    // Recursively generate HTML for each child node
    for (let i = 0; i < children.length; i++) {
        treeHTML += generateTreeHTML(children[i].node, prefix, true, children[i].last);
    }

    return treeHTML;
}

      function displayTree(tree) {
        const treeHTML = generateTreeHTML(tree);
        document.getElementById("create-rule-result").innerHTML = treeHTML;
      }

      // Handle Create Rule form submission
      document
        .getElementById("create-rule-form")
        .addEventListener("submit", async function (event) {
          event.preventDefault();
          const ruleName = document.getElementById("ruleName").value;
          const ruleString = document.getElementById("ruleString").value;
          const response = await fetch("/api/rules/create_rule", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ruleName, ruleString }),
          });
          const result = await response.json();
          let treeHTML = generateTreeHTML(result.ruleAST);
          treeHTML += `<br><p>Rule Name: ${result.ruleName}</p>`;
          document.getElementById("create-rule-result").innerHTML = treeHTML;
        });

      // Handle Combine Rules form submission
      document
        .getElementById("combine-rules-form")
        .addEventListener("submit", async function (event) {
          event.preventDefault();
          const op = document.getElementById("operator1").value;
          const rules = Array.from(
            document.querySelectorAll('input[id^="combine-rule"]')
          ).map((input) => input.value);
          const response = await fetch("/api/rules/combine_rules", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rules, op }),
          });
          const result = await response.json();
          let treeHTML = generateTreeHTML(result.ruleAST);
          treeHTML += `<br><p>Rule Name: ${result.ruleName}</p>`;
          document.getElementById("combine-rules-result").innerHTML = treeHTML;
        });

      // Add functionality to dynamically add more rule inputs
      document
        .getElementById("add-rule")
        .addEventListener("click", function () {
          const ruleInputContainer = document.createElement("div");
          ruleInputContainer.classList.add("rule-container");
          const ruleCount =
            document.querySelectorAll('input[id^="combine-rule"]').length + 1;
          ruleInputContainer.innerHTML = `
                <label for="combine-rule${ruleCount}">Rule ${ruleCount}:</label>
                <input type="text" id="combine-rule${ruleCount}" name="rule${ruleCount}" required>
            `;
          document
            .getElementById("rules-inputs")
            .appendChild(ruleInputContainer);
          this.remove();
        });

      // Handle Evaluate Rule form submission
      document
        .getElementById("evaluate-rule-form")
        .addEventListener("submit", async function (event) {
          event.preventDefault();
          const ast = document.getElementById("evaluate-ast").value;
          const data = document.getElementById("evaluate-data").value;
          const response = await fetch("/api/rules/evaluate_rule", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ast, data: JSON.parse(data) }),
          });
          const result = await response.json();
          document.getElementById("evaluate-rule-result").textContent =
            JSON.stringify(result, null, 2);
        });