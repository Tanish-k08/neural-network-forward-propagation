// ============================================
// DEFAULT VALUES
// ============================================

const defaultValues = {

    x1: 0.5,
    x2: 0.8,

    h1w1: 0.4,
    h1w2: 0.6,
    h1b: 0.1,

    h2w1: 0.7,
    h2w2: 0.3,
    h2b: 0.2,

    ow1: 0.5,
    ow2: 0.8,
    ob: 0.1

};


// ============================================
// ACTIVATION FUNCTIONS
// ============================================

function sigmoid(x) {

    return 1 / (1 + Math.exp(-x));

}


function relu(x) {

    return Math.max(0, x);

}


function tanh(x) {

    return Math.tanh(x);

}


// ============================================
// CURRENT ACTIVATION
// ============================================

let currentActivation = "sigmoid";


// ============================================
// GET ACTIVATION OUTPUT
// ============================================

function activate(value) {

    if (currentActivation === "sigmoid") {

        return sigmoid(value);

    }

    if (currentActivation === "relu") {

        return relu(value);

    }

    if (currentActivation === "tanh") {

        return tanh(value);

    }

}


// ============================================
// ROUND NUMBER
// ============================================

function round(value) {

    return Number(value.toFixed(4));

}


// ============================================
// GET VALUE
// ============================================

function getValue(id) {

    return parseFloat(
        document.getElementById(id).value
    );

}


// ============================================
// UPDATE SLIDER LABELS
// ============================================

function updateSliderLabels() {

    const ids = [

        "x1",
        "x2",

        "h1w1",
        "h1w2",
        "h1b",

        "h2w1",
        "h2w2",
        "h2b",

        "ow1",
        "ow2",
        "ob"

    ];


    ids.forEach(id => {

        const value =
            getValue(id);

        const label =
            document.getElementById(
                id + "Value"
            );

        label.textContent =
            value.toFixed(2);

    });


    // Update diagram inputs

    document.getElementById("diagramX1")
        .textContent =
        getValue("x1").toFixed(2);


    document.getElementById("diagramX2")
        .textContent =
        getValue("x2").toFixed(2);

}


// ============================================
// CALCULATE NETWORK
// ============================================

function calculateNetwork() {

    // INPUTS

    const x1 = getValue("x1");
    const x2 = getValue("x2");


    // HIDDEN H1

    const h1w1 = getValue("h1w1");
    const h1w2 = getValue("h1w2");
    const h1b = getValue("h1b");


    const h1Z =
        (x1 * h1w1) +
        (x2 * h1w2) +
        h1b;


    const h1Output =
        activate(h1Z);


    // HIDDEN H2

    const h2w1 = getValue("h2w1");
    const h2w2 = getValue("h2w2");
    const h2b = getValue("h2b");


    const h2Z =
        (x1 * h2w1) +
        (x2 * h2w2) +
        h2b;


    const h2Output =
        activate(h2Z);


    // OUTPUT NEURON

    const ow1 = getValue("ow1");
    const ow2 = getValue("ow2");
    const ob = getValue("ob");


    const outputZ =
        (h1Output * ow1) +
        (h2Output * ow2) +
        ob;


    const finalOutput =
        activate(outputZ);


    // PREDICTION

    let prediction;

    if (finalOutput >= 0.5) {

        prediction = "Class 1";

    } else {

        prediction = "Class 0";

    }


    // ========================================
    // UPDATE DIAGRAM
    // ========================================

    document.getElementById("diagramH1")
        .textContent =
        round(h1Output);


    document.getElementById("diagramH2")
        .textContent =
        round(h2Output);


    document.getElementById("diagramOutput")
        .textContent =
        round(finalOutput);


    // ========================================
    // UPDATE RESULT CARDS
    // ========================================

    document.getElementById("h1Result")
        .textContent =
        round(h1Output);


    document.getElementById("h2Result")
        .textContent =
        round(h2Output);


    document.getElementById("finalResult")
        .textContent =
        round(finalOutput);


    document.getElementById("prediction")
        .textContent =
        prediction;


    // ========================================
    // UPDATE CALCULATIONS
    // ========================================

    document.getElementById(
        "calculationContent"
    ).innerHTML = `

        <div class="calculation">

            <h3>Neuron H1</h3>

            <p>
                z = (X1 × W1) + (X2 × W2) + Bias
            </p>

            <code>
                z = (${x1.toFixed(2)} × ${h1w1.toFixed(2)})
                + (${x2.toFixed(2)} × ${h1w2.toFixed(2)})
                + ${h1b.toFixed(2)}
            </code>

            <p>
                Weighted Sum =
                <strong>${round(h1Z)}</strong>
            </p>

            <p>
                ${currentActivation}
                (${round(h1Z)}) =
                <strong>${round(h1Output)}</strong>
            </p>

        </div>


        <div class="calculation">

            <h3>Neuron H2</h3>

            <p>
                z = (X1 × W1) + (X2 × W2) + Bias
            </p>

            <code>
                z = (${x1.toFixed(2)} × ${h2w1.toFixed(2)})
                + (${x2.toFixed(2)} × ${h2w2.toFixed(2)})
                + ${h2b.toFixed(2)}
            </code>

            <p>
                Weighted Sum =
                <strong>${round(h2Z)}</strong>
            </p>

            <p>
                ${currentActivation}
                (${round(h2Z)}) =
                <strong>${round(h2Output)}</strong>
            </p>

        </div>


        <div class="calculation">

            <h3>Output Neuron</h3>

            <p>
                z = (H1 × W1) + (H2 × W2) + Bias
            </p>

            <code>
                z = (${round(h1Output)} × ${ow1.toFixed(2)})
                + (${round(h2Output)} × ${ow2.toFixed(2)})
                + ${ob.toFixed(2)}
            </code>

            <p>
                Weighted Sum =
                <strong>${round(outputZ)}</strong>
            </p>

            <p>
                Final Output =
                <strong>${round(finalOutput)}</strong>
            </p>

            <p>
                Prediction =
                <strong>${prediction}</strong>
            </p>

        </div>

    `;


    // ========================================
    // ANIMATION
    // ========================================

    animateNetwork();

}


// ============================================
// NETWORK ANIMATION
// ============================================

function animateNetwork() {

    const neurons = [

        document.getElementById("input1"),
        document.getElementById("input2"),
        document.getElementById("hidden1"),
        document.getElementById("hidden2"),
        document.getElementById("outputNeuron")

    ];


    neurons.forEach(neuron => {

        neuron.classList.remove("active");

    });


    setTimeout(() => {

        document.getElementById("input1")
            .classList.add("active");

        document.getElementById("input2")
            .classList.add("active");

    }, 100);


    setTimeout(() => {

        document.getElementById("input1")
            .classList.remove("active");

        document.getElementById("input2")
            .classList.remove("active");

        document.getElementById("hidden1")
            .classList.add("active");

        document.getElementById("hidden2")
            .classList.add("active");

    }, 600);


    setTimeout(() => {

        document.getElementById("hidden1")
            .classList.remove("active");

        document.getElementById("hidden2")
            .classList.remove("active");

        document.getElementById("outputNeuron")
            .classList.add("active");

    }, 1100);


    setTimeout(() => {

        document.getElementById("outputNeuron")
            .classList.remove("active");

    }, 1700);

}


// ============================================
// ACTIVATION BUTTONS
// ============================================

const activationButtons =
    document.querySelectorAll(".activation");


activationButtons.forEach(button => {

    button.addEventListener("click", () => {

        activationButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentActivation =
            button.dataset.function;


        calculateNetwork();

    });

});


// ============================================
// SLIDER EVENTS
// ============================================

const sliders =
    document.querySelectorAll(
        'input[type="range"]'
    );


sliders.forEach(slider => {

    slider.addEventListener("input", () => {

        updateSliderLabels();

        calculateNetwork();

    });

});


// ============================================
// CALCULATE BUTTON
// ============================================

document.getElementById(
    "calculateBtn"
).addEventListener(
    "click",
    calculateNetwork
);


// ============================================
// RESET
// ============================================

document.getElementById(
    "resetBtn"
).addEventListener(
    "click",
    () => {

        Object.keys(defaultValues).forEach(id => {

            document.getElementById(id).value =
                defaultValues[id];

        });


        currentActivation = "sigmoid";


        activationButtons.forEach(button => {

            button.classList.remove("active");

        });


        document.querySelector(
            '[data-function="sigmoid"]'
        ).classList.add("active");


        updateSliderLabels();

        calculateNetwork();

    }
);


// ============================================
// INITIAL CALCULATION
// ============================================

updateSliderLabels();

calculateNetwork();