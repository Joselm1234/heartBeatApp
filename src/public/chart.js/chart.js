new Chart(document.getElementById("doughnut-chart"), {
    type: 'doughnut',
    data: {
        labels: ["Peligro", "Precaución"],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#fa1414", "#eab105"],
            data: [2478, 5267]
        }]
    }
});