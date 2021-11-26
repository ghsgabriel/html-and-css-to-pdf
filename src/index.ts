import express from 'express';
import pdf, {CreateOptions} from 'html-pdf';

const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

interface RequestBody {
    html: string;
    height: string;
    width: string;
}

app.post('/', (req, res) => {
    const configs = req.body as RequestBody;
    const options: CreateOptions = {
        width: configs.width,
        height: configs.height,
        border: {top: '0px', bottom: '0px', left: '0px', right: '0px'}
    };
    const html = "<html style='margin: 0;padding: 0;border: 0;'>" +
        "<body style='margin: 0;padding: 0;border: 0;'>" +
        "<style>@page {margin: 0px;margin-top:0px;}</style>" +
        configs.html +
        "</body></html>"

    pdf.create(html, options).toBuffer(function (err, buffer) {
        res.type('application/pdf');
        res.end(buffer, 'binary');
    });
});

app.listen(3000, () => console.log('On: http://localhost:3000'));