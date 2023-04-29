
// education
educationHover();
function educationHover() {
    const educationCards = document.getElementById('educationCards');
    for (let i = 0; i < educationCards.children.length; i++) {
        const eachElement = educationCards.children[i].id = `collapseCardEducation${i}`;
        const element = document.getElementById(eachElement);
        element.addEventListener("mouseover", function () {
            const btnDiv = element.children[0].children[0].children[1].id = `btnDiv${i}`;
            const btnElement = document.getElementById(btnDiv);
            if (btnElement.classList.contains('d-none')) {
                btnElement.classList.remove('d-none');
            }
        });

        element.addEventListener("mouseout", function () {
            const btnDiv = element.children[0].children[0].children[1].id = `btnDiv${i}`;
            const btnElement = document.getElementById(btnDiv);
            btnElement.classList.add('d-none');
        });
    }
}



// work exp
workExpHover();
function workExpHover() {
    const workExpCards = document.getElementById('workExpCards');
    for (let i = 0; i < workExpCards.children.length; i++) {
        const eachExpElement = workExpCards.children[i].id = `collapseCardWorkExp${i}`;
        const workElement = document.getElementById(eachExpElement);
        workElement.addEventListener("mouseover", function () {
            const btnDiv = workElement.children[0].children[0].children[1].id = `btnDivExp${i}`;
            const btnElement = document.getElementById(btnDiv);
            if (btnElement.classList.contains('d-none')) {
                btnElement.classList.remove('d-none');
            }
        });

        workElement.addEventListener("mouseout", function () {
            const btnDiv = workElement.children[0].children[0].children[1].id = `btnDivExp${i}`;
            const btnElement = document.getElementById(btnDiv);
            btnElement.classList.add('d-none');
        });

        // currently work here
        let presentlyWorkingDiv = workElement.children[1].children[0].children['workTimePeriod'].children['workTimePeriodSwitch'].children[0].children[0].children[0].children[0]

        const currentWorkCheckBoxEach = presentlyWorkingDiv.id = `currentlyWorkHereSwitch${i}`

        const CheckBox = document.getElementById(currentWorkCheckBoxEach);

        // input and check box
        const timePeriodTo = workElement.children[1].children[0].children['workTimePeriod'].children[1].children[2];
        const presentInputBox = workElement.children[1].children[0].children['workTimePeriod'].children[1].children[3];
        CheckBox.addEventListener("click", function () {
            if (CheckBox.checked === true) {
                timePeriodTo.classList.add('d-none');
                presentInputBox.classList.remove('d-none');
            } else {
                timePeriodTo.classList.remove('d-none');
                presentInputBox.classList.add('d-none');
            }
        })
    }
}


// text editor
ClassicEditor
    .create(document.querySelector('#editor'))
    .then(editor => {
        // console.log(editor);
    })
    .catch(error => {
        // console.error(error);
    });


    

