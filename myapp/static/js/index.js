import AddRestriction from "./add-form.js";
import RemoveRestriction from "./remove-form.js";
import Form from "./form.js";
import Alert from "./alert.js";


document.addEventListener('DOMContentLoaded', function () {
    const form = new Form();
    const alert = new Alert();
    const removeRestriction = new RemoveRestriction(form);
    const addRestriction = new AddRestriction(form, removeRestriction);
});