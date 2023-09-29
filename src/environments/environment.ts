// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

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
    cardName: {
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
