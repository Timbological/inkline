export const manifest = {
    "name": "IFormError",
    "props": [
        {
            "name": "for",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The schema path of the target input to show the errors for."
        },
        {
            "name": "visible",
            "type": [
                "Array",
                "String"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "Set the validation statuses for which the form error should be visible."
        }
    ],
    "events": [],
    "slots": [],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--form-error--margin",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-error--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-error-font-size",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
