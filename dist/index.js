"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const html_pdf_1 = __importDefault(require("html-pdf"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb' }));
app.post('/', (req, res) => {
    const configs = req.body;
    const options = {
        width: configs.width,
        height: configs.height,
        border: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
    };
    const html = "<html style='margin: 0;padding: 0;border: 0;'>" +
        "<body style='margin: 0;padding: 0;border: 0;'>" +
        "<style>@page {margin: 0px;margin-top:0px;}</style>" +
        configs.html +
        "</body></html>";
    html_pdf_1.default.create(html, options).toBuffer(function (err, buffer) {
        res.type('application/pdf');
        res.end(buffer, 'binary');
    });
});
app.listen(3000, () => console.log('On: http://localhost:3000'));
