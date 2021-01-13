export const environment = {
  production: false,

  cardConfig: {
    card: {
      x: 0,
      y: 0,
      widthPx: 171,
      heightPx: 256,
    },
    flag: {
      x: 26,
      y: 43,
      widthPx: 29,
      heightPx: 29
    },
    grade: {
      x: 120,
      y: 0,
      widthPx: 20,
      heightPx: 19
    },
    playerName: {
      x: 27,
      y: 40,
      fontName: 'Komika Axis',
      fontSize: 18,
      maxWidthPx: 123.8,
      color: '#1b455a'
    },
    countryName: {
      x: 58,
      y: 62,
      fontName: 'Komika Axis',
      fontSize: 11,
      maxWidthPx: 93.8,
      color: '#00883d'
    },
  },

  pdfConfig: {
    structure: {
      pageSize: 16,
      rowSize: 4,
      firstCardXMm: 8.1,
      firstCardYMm: 6.6,
      cardsColStartsDistMm: 50,
      cardsRowStartsDistMm: 70
    },
    card: {
      widthMm: 45,
      heightMm: 66,
      imageExt: 'image/png',
      fileExt: 'png',
      pixelRatio: 2,
      compression: 'NONE'
    },
    pdfAction: {
      type: 'dataurlnewwindow',
      popupsSecurity: 'datauristring'
    },
    metadata: {
      title: 'Counter Attack Custom Cards',
      subject: 'Counter Attack Custom Cards',
      author: 'Counter Attack Custom Cards Generator',
      creator: 'Counter Attack Board Game Tools'
    }
  },

  exampleExcelConfig: {
    fileName: 'example.xls'
  }
};
