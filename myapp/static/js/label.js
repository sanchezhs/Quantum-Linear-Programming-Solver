export default class Label {
    constructor() {
        this.constraintsLabel = document.createElement('label');
        this.constraintsLabel.setAttribute('id', 'label-constraint-id');
        this.constraintsLabel.setAttribute('class', 'd-none');
        this.constraintsLabel.innerText = 'Subject to:';
        this.target = document.getElementById('label-target');
        this.target.append(this.constraintsLabel);
    }
    
    show() {
        console.log('label')
        this.constraintsLabel.classList.remove('d-none');
    }

    hide() {
        this.constraintsLabel.setAttribute('class', 'd-none');
    }
}