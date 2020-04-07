import pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

export default class pdfSigaa {
    constructor(pdfEncoded) {
        var pdfData = atob(pdfEncoded)
        this.loadingTask = pdfjs.getDocument({data: pdfData});
    }

    
    getTextFromPdf() {
        return this.loadingTask.promise.then((pdf) => {
            var maxPages = pdf.numPages;
            var promises = [];
            for(var count = 1; count <= maxPages; count++) {
                var page = pdf.getPage(count);

                promises.push(
                    page.then((page) => {
                        var pageContent = page.getTextContent();
                        return pageContent.then((text) => {
                            return text.items.map((s) => { return s.str; }).join(' ');
                        });
                    })
                );
            }
            return Promise.all(promises).then((texts) => { return texts.join(''); })
        });
    }
}