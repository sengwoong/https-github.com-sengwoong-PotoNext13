import React from 'react'

import { Document, Page,  } from 'react-pdf';

interface Props {
  url:string;
  PageWidth:number;
  ReduxpageScale:number;
  ReduxpageNumber:number;
  PdfSizeRef:React.RefObject<HTMLDivElement>;
}

 const pdfpage=({url,PageWidth,ReduxpageScale,ReduxpageNumber,PdfSizeRef}:Props)=>
 {
  return (
    <div>



    </div>
  )
}
export default pdfpage