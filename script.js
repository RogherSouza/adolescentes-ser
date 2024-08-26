function addScore() {
    const name = document.getElementById('name').value.trim();
    const score = parseInt(document.getElementById('score').value);
    const password = prompt("Digite a senha para limpar pontuações:");

    if (password === "42843") {
        clearScores();
        return;
    }

    if (name === "" || isNaN(score)) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const table = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    let nameFound = false;

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const cellName = row.cells[1].innerText;

        if (cellName.toLowerCase() === name.toLowerCase()) {
            const currentScore = parseInt(row.cells[2].innerText);
            row.cells[2].innerText = currentScore + score;
            nameFound = true;
            break;
        }
    }

    if (!nameFound) {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.innerHTML = table.rows.length;
        cell2.innerHTML = name;
        cell3.innerHTML = score;
    }

    sortTableByScore();

    document.getElementById('name').value = "";
    document.getElementById('score').value = "";
}

function sortTableByScore() {
    const table = document.getElementById('scoreTable');
    const rows = Array.from(table.rows).slice(1);

    rows.sort((a, b) => {
        const scoreA = parseInt(a.cells[2].innerText);
        const scoreB = parseInt(b.cells[2].innerText);
        return scoreB - scoreA;
    });

    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
        table.getElementsByTagName('tbody')[0].appendChild(row);
    });
}

function showSuggestions() {
    const input = document.getElementById('name');
    const suggestionsBox = document.getElementById('suggestions');
    const tableRows = document.querySelectorAll('#scoreTable tbody tr');
    
    suggestionsBox.innerHTML = ''; // Clear previous suggestions

    const inputValue = input.value.toLowerCase();
    if (inputValue.length === 0) {
        suggestionsBox.style.display = 'none';
        return;
    }

    tableRows.forEach(row => {
        const name = row.cells[1].innerText.toLowerCase();
        if (name.includes(inputValue)) {
            const suggestion = document.createElement('div');
            suggestion.innerText = row.cells[1].innerText;
            suggestion.onclick = function() {
                input.value = suggestion.innerText;
                suggestionsBox.innerHTML = '';
                suggestionsBox.style.display = 'none';
            };
            suggestionsBox.appendChild(suggestion);
        }
    });

    suggestionsBox.style.display = suggestionsBox.children.length > 0 ? 'block' : 'none';
}

function clearScores() {
    const password = prompt("Digite a senha para limpar pontuações:");
    
    if (password === "42843") {
        const table = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
        table.innerHTML = '';
    } else {
        alert("Senha incorreta.");
    }
}

// Adicionar funcionalidade de navegação entre células com Enter
document.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentRow = cell.parentElement.rowIndex;
            const currentCol = cell.cellIndex;
            const nextCell = document.querySelector(`#scoreTable tbody tr:nth-child(${currentRow}) td:nth-child(${currentCol + 2})`);

            if (nextCell) {
                nextCell.focus();
            } else if (currentRow < document.querySelectorAll('#scoreTable tbody tr').length) {
                document.querySelector(`#scoreTable tbody tr:nth-child(${currentRow + 1}) td:nth-child(2)`).focus();
            }
        }
    });
});
