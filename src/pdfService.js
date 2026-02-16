import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfMakeFonts from 'pdfmake/build/vfs_fonts.js';

// Setup pdfMake
pdfMake.vfs = pdfMakeFonts.pdfMakeVFS;

const toCamelCase = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getIndonesianDate = () => {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = new Date();
    return `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
};

export async function generatePdfBuffer(formData, signatureBase64 = null, imageHeaderBase64 = null) {
  console.log('[PDF Service] Generating PDF dengan pdfMake library...');

  const { 
    nama = '', 
    judul = '', 
    nik = '', 
    address = '', 
    pt = '', 
    pencipta = '', 
    asNama = '', 
    bankName = '', 
    npwp = '', 
    imail = '', 
    phone = '', 
    norek = '' 
  } = formData || {};

  const indonesianDate = getIndonesianDate();

  const content = [
    // COVER
    { text: 'PERJANJIAN LISENSI', style: 'header', alignment: 'center' },
    { text: toCamelCase(nama), style: 'subheader', alignment: 'center' },
    { text: `No. A/${new Date().getFullYear()}`, style: 'subheader', alignment: 'center' },
    
    { text: `Perjanjian Kerjasama ${pt} mengenai pemberian lisensi Konten "${judul}".`, style: 'paragraph' },
    { text: `Perjanjian ini ditandatangani pada hari ${indonesianDate} oleh dan antara :`, style: 'paragraph' },
    
    {
      stack: [
        {
          text: [
            '1. ',
            { text: toCamelCase(nama), bold: true },
            ' seorang subyek hukum individu mewakili dirinya sendiri beralamat di ',
            address,
            ' dengan NIK ',
            nik,
            '. Untuk selanjutnya akan disebut sebagai ',
            { text: 'Pemberi Lisensi', bold: true },
            ' (Licensor).'
          ],
          style: 'paragraph'
        },
        {
          text: [
            '2. ',
            { text: pt, bold: true },
            ', beralamat di Cetennial Tower Lantai 38 unit H, Jl. Jend. Gatot Subroto Kav 24-25, Karet Semanggi, Setiabudi, Jakarta Selatan, Kode Pos 12930, dalam hal ini diwakili oleh ',
            { text: 'Lay Laberto', bold: true },
            ' dalam jabatannya sebagai Direktur pada perseroan tersebut, selanjutnya akan disebut sebagai ',
            { text: 'Penerima Lisensi', bold: true },
            ' (Licensee).'
          ],
          style: 'paragraph'
        }
      ],
      margin: [0, 0, 0, 0]
    },
    
    {
      text: [
        'Pemberi Lisensi dan Penerima Lisensi masing-masing disebut juga sebagai "',
        { text: 'Pihak', bold: true },
        '" dan secara bersama-sama akan disebut sebagai "',
        { text: 'Para Pihak', bold: true },
        '".'
      ],
      style: 'paragraph'
    },
    
    { text: 'Para Pihak terlebih dahulu dengan ini menerangkan bahwa :', style: 'paragraph' },
    
    {
      type: 'upper-alpha',
      ol: [
        {
          text: [
            'Pemberi Lisensi adalah subyek hukum Individual yang bertindak untuk dan atas nama ',
            { text: toCamelCase(nama), bold: true },
            ' dan sebagai pemilik hak eksploitasi atas semua karya musik dan Konten ',
            { text: judul, bold: true },
            ' yang hak eksploitasinya telah dialihkan atau diberikan lisensi untuk eksploitasi-nya oleh Pemilik atau Pemberi Lisensi atau para penciptanya ',
            { text: '("Pencipta")', bold: true },
            ' kepada Pemberi Lisensi; yang diuraikan pada Lampiran 2;'
          ],
          style: 'paragraph'
        },
        {
          text: [
            'Penerima Lisensi berniat untuk melakukan eksploitasi Konten ',
            { text: judul, bold: true },
            ' yang hak eksploitasinya berada pada Pemberi Lisensi dengan memproduksi menjadi berbagai produk audio dan media dalam format digital app pada mobile dan komputer ',
            { text: '("Konten")', bold: true },
            '. Penerima Lisensi akan mengadakan kerjasama dengan beberapa website atau aplikasi digital untuk dilakukan eksploitasi hak cipta ',
            { text: '("Pelanggan")', bold: true },
            ' dalam bentuk Full Track.'
          ],
          style: 'paragraph'
        },
        {
          text: [
            'Konten Single/Musik ',
            { text: judul, bold: true },
            ' yang hak eksploitasinya berada pada Pemberi Lisensi akan disimpan dalam server aplikasi milik Penerima Lisensi dan akan dipasarkan secara digital. Bahwa Pemberi Lisensi nantinya akan memperoleh pembayaran ',
            { text: '("Bagi Hasil")', bold: true },
            ' dari penjualan Konten tersebut.'
          ],
          style: 'paragraph'
        },
        {
          text: [
            'Pemberi Lisensi setuju untuk memberikan lisensi yang diperlukan oleh Penerima Lisensi untuk pengadaan dan pemasaran Konten "',
            { text: judul, bold: true },
            '" secara digital yang hak ekploitasinya berada pada Pemberi Lisensi berdasarkan syarat-syarat dan ketentuan-ketentuan yang ditetapkan didalam Perjanjian ini.'
          ],
          style: 'paragraph'
        }
      ]
    },
    
    { text: 'Selanjutnya Para Pihak dengan ini menyatakan setuju dan terikat pada pernyataan-pernyataan syarat-syarat dan ketentuan-ketentuan sebagai berikut :', style: 'paragraph' },
    
    // PASAL 1
    { text: 'Pasal 1', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'JANGKA WAKTU PERJANJIAN DAN PERPANJANGANNYA', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [
            'Perjanjian ini diadakan untuk jangka waktu tersebut pada butir 5 Lampiran 1 Perjanjian ini ',
            { text: '("Periode Perjanjian")', bold: true },
            ' kecuali diakhiri lebih awal atau menjadi berakhir lebih awal menurut ketentuan yang ditetapkan didalam Pasal 10 dibawah ini;'
          ],
          style: 'paragraph',
          counter: 1.1
        },
        {
          text: 'Kedua belah pihak dapat memperpanjang Masa Berlakunya Perjanjian sebelum Masa Berlakunya Perjanjian berakhir.',
          style: 'paragraph',
          counter: 1.2
        }
      ],
      type: 'ordered'
    },
    
    // PASAL 2
    { text: 'Pasal 2', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'PEMBERIAN LISENSI', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [
            'Sepanjang Masa Berlakunya Perjanjian dan sepanjang berlakunya lisensi berdasarkan Perjanjian ini, Pemberi-Lisensi memberi lisensi atau izin kepada Penerima-Lisensi untuk melakukan tindakan-tindakan berikut ini dan seperti diuraikan pada Lampiran 1 atas Konten single/musik "',
            { text: judul, bold: true },
            '" yang hak eksploitasinya berada pada Pemberi-Lisensi dan menjadi bagian dari Karya Lisensi tersebut pada Ayat 2.2., sebagai berikut :'
          ],
          style: 'paragraph',
          counter: 2.1
        },
        {
          type: 'lower-alpha',
          ol: [
            { text: [`Mengorganisir Konten "`, { text: judul, bold: true }, `" termasuk melakukan editorial pada produk Konten Musik untuk App;`], style: 'paragraph' },
            { text: 'Menyimpan Konten dalam server aplikasi Penerima Lisensi;', style: 'paragraph' },
            { text: [`Memasarkan serta mempromosikan Konten melalui berbagai media termasuk media cetak dan elektronik dengan menyebutkan, menyatakan, mencatumkan judul Konten "`, { text: judul, bold: true }, `", nama Pencipta, dan dimana perlu juga nama Pemberi Lisensi;`], style: 'paragraph' },
            { text: 'Memberi akses kepada pelanggan untuk menggunakan Konten melalui telepon, komputer atau gawai mereka;', style: 'paragraph' },
            { text: 'Menggunakan Konten dalam semua jenis promosi termasuk promosi audio atau audio-visual;', style: 'paragraph' },
            { text: 'Mengadakan kerjasama dengan aggregator afiliasi yang dipandang baik oleh Penerima Lisensi jika diperlukan.', style: 'paragraph' },
            { text: [`Penerima Lisensi akan memberikan laporan kepada pihak Pemberi-Lisensi atas hasil promosi Konten "`, { text: judul, bold: true }, `";`], style: 'paragraph' }
          ]
        },
        {
          text: [`Konten "`, { text: judul, bold: true }, `" dengan ini diberikan lisensinya oleh Pemberi-Lisensi kepada Penerima-Lisensi untuk dieksploitasi sebagai Konten diuraikan pada daftar terlampir sebagai Lampiran 2 Perjanjian ini, beserta tambahan sepanjang Masa Berlakunya Perjanjian.`],
          style: 'paragraph',
          counter: 2.2
        },
        {
          text: 'Lisensi ini diberikan hanya untuk digunakan didalam wilayah negara Republik Indonesia ("Territori").',
          style: 'paragraph',
          counter: 2.3
        }
      ],
      type: 'ordered'
    },
    
    // PASAL 3
    { text: 'Pasal 3', style: 'paragraph', alignment: 'center', bold: true },
    { text: [`KONTEN "${judul}"`], style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [`Setiap penambahan Konten "`, { text: judul, bold: true }, `" ke dalam daftar Konten Lisensi atau penghapusan suatu Konten dari daftar Lisensi hanya sah jika diadakan atas pesetujuan tegas kedua belah pihak dan akan berlaku setelah dituangkan dalam suatu naskah yang ditandatangani oleh wakil-wakil yang sah dari kedua belah pihak;`],
          style: 'paragraph',
          counter: 3.1
        },
        {
          text: 'Dalam hal edit Konten Lisensi, kedua belah pihak sepakat bahwa hal itu hanya bersifat redaksional dan tidak akan mengubah bagian ataupun jalinan Konten Lisensi yang utuh:',
          style: 'paragraph',
          counter: 3.2
        },
        {
          text: 'Penambahan Konten setelah Pemberi-Lisensi menerima bagi hasil tidak akan dikenakan biaya tambahan oleh pihak Pemberi-Lisensi kepada Penerima-Lisensi.',
          style: 'paragraph',
          counter: 3.3
        }
      ],
      type: 'ordered'
    },
    
    // PASAL 4
    { text: 'Pasal 4', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'CARA PEMBAYARAN PEMBAGIAN KEUNTUNGAN DAN BAGI HASIL', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [`Penerima Lisensi akan menyampaikan suatu laporan tentang transaksi berdasarkan Data Konsolidasi `, { text: '"Laporan Transaksi"', bold: true }, ` paling lambat 2 (dua) bulan setelah Pemberi Lisensi meminta Data Konsolidasi tersebut dari Penerima Lisensi. Atas `, { text: '"Laporan Transaksi"', bold: true }, ` ini Pemberi Lisensi dapat meminta verifikasi kepada Penerima Lisensi dalam waktu 14 (empat belas) hari terhitung tanggal laporan tersebut. Apabila Pemberi Lisensi tidak mengajukan suatu keberatan atau permintaan verifikasi dalam batas waktu tersebut maka Pemberi Lisensi telah menerima baik kebenaran dari transaksi dalam `, { text: '"Laporan Transaksi"', bold: true }, ` tersebut oleh karenanya tidak dapat mengajukan keberatan atau permintaan verifikasi dikemudian hari atas laporan yang bersangkutan;`],
          style: 'paragraph',
          counter: 4.1
        },
        {
          text: 'Pemberi Lisensi akan menerbitkan invoice kepada Penerima Lisensi berdasarkan Laporan Transaksi dan Penerima Lisensi akan membayar invoice dalam waktu 30 (tiga puluh) hari terhitung tanggal diterimanya invoice bersangkutan;',
          style: 'paragraph',
          counter: 4.2
        },
        {
          text: 'Pemberi Lisensi memahami bahwa jadwal pembayaran atas invoice sebagaimana diatur pada pasal 4.2 yang dilakukan oleh Penerima Lisensi hanyalah dilakukan setiap akhir bulan;',
          style: 'paragraph',
          counter: 4.3
        },
        {
          text: 'Atas pembayaran pembagian keuntungan kepada Pemberi Lisensi akan berlaku ketentuan perpajakan Indonesia.',
          style: 'paragraph',
          counter: 4.4
        }
      ],
      type: 'ordered'
    },
    
    // PASAL 5
    { text: 'Pasal 5', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'HAK MILIK INTELEKTUAL', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [`Pemberi Lisensi dengan ini mengaku dan menyatakan bahwa Pemberi Lisensi mempunyai hak dan/atau lisensi secara utuh dari Pencipta semua pihak yang mempunyai hak atau turut mempunyai hak milik intelektual atas Konten "`, { text: judul, bold: true }, `" tetapi tidak terbatas pada copyrights dan hak untuk mendistribusikan melalui segala media dan saluran distribusi serta hak untuk menggunakan judul Lisensi untuk keperluan publikasi promosi melalui media cetak atau elektronik serta penggunaan Konten "`, { text: judul, bold: true }, `" dan lainnya untuk promosi audio;`],
          style: 'paragraph',
          counter: 5.1
        },
        {
          text: [`Untuk menguatkan hak-hak tersebut pada ayat lalu maka atas setiap Konten "`, { text: judul, bold: true }, `" Pemberi-Lisensi akan melengkapinya dengan surat pernyataan pencipta atau dokumen-dokumen konfirmasi tentang pemberian hak yang ditandatangani oleh Pemberi Lisensi dan pihak-pihak lain yang berhak atas Konten "`, { text: judul, bold: true }, `". Tetapi ketiadaan atau kurangnya surat atau dokumen demikian tidak mengurangi berlakunya pernyataan maupun jaminan Pemberi Lisensi tersebut pada ayat lalu dan ayat 6.1. ayat 6.2. dan ayat 6.3. dibawah ini;`],
          style: 'paragraph',
          counter: 5.2
        },
        {
          text: [`Pemberi Lisensi dari waktu-kewaktu sepanjang Masa Berlakunya Perjanjian dan sepanjang lisensi yang diberikan dalam Perjanjian ini berlaku akan menjaga dan memastikan agar hak-hak intelektual tersebut pada Ayat 5.1 tetap berlaku. Apabila dalam Masa Berlakunya Perjanjian dan sepanjang lisensi yang diberikan dalam Perjanjian ini berlaku terdapat hak atas Konten "`, { text: judul, bold: true }, `" menjadi berakhir atau hilang maka Pemberi-Lisensi wajib memberitahukan dengan cara menyampaikan hal itu secara tertulis kepada Penerima-Lisensi paling sedikit 45 (empat puluh lima) hari sebelum berakhir atau diakhirinya hak tersebut. Semua beban dan kerugian yang timbul pada Penerima-Lisensi sebagai akibat dari kelalaian Pemberi-Lisensi melaksanakan pemberitahuan tersebut akan dipikul oleh Pemberi-Lisensi;`],
          style: 'paragraph',
          counter: 5.3
        },
        {
          text: [`Penerima Lisensi adalah pemilik hak milik intelektual satu-satunya dan untuk keseluruhannya atas Konten `, { text: judul, bold: true }, `.`],
          style: 'paragraph',
          counter: 5.4
        }
      ],
      type: 'ordered'
    },
    
    // PASAL 6
    {
      stack: [
        { text: 'Pasal 6', style: 'paragraph', alignment: 'center', bold: true },
        { text: 'PERNYATAAN JAMINAN', style: 'paragraph', alignment: 'center', bold: true },
        {
          ol: [
            {
              text: `Pemberi Lisensi dengan ini menyatakan dan menjamin kepada Penerima Lisensi bahwa:`, 
              style: 'paragraph', 
              bold: true, 
              counter: 6.1
            },
            {
              type: 'lower-alpha',
              ol: [
                { text: `Pemberi Lisensi berhak dan tidak mempunyai ikatan dengan pihak lain yang menjadi halangan hukum untuk mengadakan dan melaksanakan Perjanjian ini;`, style: 'paragraph' },
                { text: `Pemberi Lisensi diperbolehkan secara hukum atau telah memperoleh semua perizinan dan/atau persetujuan dari sisi korporasi yang diperlukan untuk bekerja sama di bawah Perjanjian ini;`, style: 'paragraph' },
                { text: `Pemberian lisensi oleh Pemberi Lisensi kepada Penerima Lisensi dan pelaksanaan hak-hak oleh Penerima Lisensi berdasarkan lisensi ini tidak akan melanggar hak milik intelektual pihak lain;`, style: 'paragraph' },
                { text: [`Pemberi Lisensi mempunyai semua persetujuan-persetujuan lisensi dan/atau hak milik intelektual secara utuh yang diperlukan untuk melaksanakan Perjanjian ini terutama hak untuk eksploitasi copyrights atas Konten "`, { text: judul, bold: true }, `";`], style: 'paragraph' },
                { text: [`Pemberi Lisensi dari waktu ke waktu sepanjang Masa Berlakunya Perjanjian dan sepanjang berlakunya lisensi berdasarkan Perjanjian ini akan menjaga agar setiap lisensi dan setiap hak yang berkenaan dengan setiap Konten "`, { text: judul, bold: true }, `", tanpa kecuali, termasuk hak dan lisensi, tetap berlaku, yang memungkinkan Penerima Lisensi untuk secara sah menggunakan nama Konten "`, { text: judul, bold: true }, `" untuk aktivitas publikasi promosi baik melalui media cetak maupun elektronik;`], style: 'paragraph' },
                { text: [`Pemberi Lisensi dari waktu kewaktu sepanjang Masa Berlakunya Perjanjian dan sepanjang berlakunya lisensi berdasarkan Perjanjian ini akan menjaga dan memastikan bahwa substansi Konten "`, { text: judul, bold: true }, `" tidak bersifat mempertentangkan atau merendahkan ras, agama, suku, golongan atau etnik tertentu, begitu pula tidak bertentangan dengan nilai-nilai kesusilaan dan kesopanan yang berlaku umum di Indonesia serta tidak melanggar hukum yang berlaku di Indonesia.`], style: 'paragraph' }
              ]
            },
            {
              text: [`Pemberi Lisensi dengan ini juga menyatakan dan menjamin kepada Penerima Lisensi bahwa `, { text: `setiap kerugian yang diderita oleh Penerima Lisensi baik secara langsung ataupun tidak langsung maupun karena beban tuntutan pihak lain terutama namun tidak terbatas pada tuntutan para pemegang hak milik intelektual lembaga kolektif royati atau pemerintah sebagai akibat dari dilanggarnya salah satu atau lebih jaminan-jaminan Pemberi Lisensi pada ayat 6.1. di atas maka kerugian itu sepenuhnya tanpa kecuali akan dipikul oleh Pemberi Lisensi;`, style: 'paragraph'}],
              style: 'paragraph',
              counter: 6.2
            },
            {
              text: `Penerima Lisensi dengan ini menyatakan dan menjamin kepada Pemberi Lisensi bahwa:`,
              style: 'paragraph',
              bold: true,
              counter: 6.3
            },
            {
              type: 'lower-alpha',
              ol: [
                { text: `Penerima Lisensi berhak dan tidak mempunyai ikatan dengan pihak lain yang menjadi halangan hukum untuk mengadakan dan melaksanakan Perjanjian ini;`, style: 'paragraph' },
                { text: `Penerima Lisensi telah memperoleh semua perizinan dan/atau persetujuan dari sisi korporasi yang diperlukan untuk mengadakan Perjanjian ini;`, style: 'paragraph' },
                { text: [`Penerima Lisensi dari waktu-kewaktu sepanjang Masa Berlakunya Perjanjian dan sepanjang berlakunya lisensi berdasarkan Perjanjian ini akan menggunakan upaya yang wajar secara komersial demi menjaga dan memastikan bahwa Konten "`, { text: judul, bold: true }, `" hanya akan dieksploitasi dalam batas-batas dan untuk tujuan sebagaimana ditetapkan didalam Perjanjian ini;`], style: 'paragraph' },
                { text: [`Penerima Lisensi tidak akan mengalihkan hak-hak atas Konten "`, { text: judul, bold: true }, `" yang diperoleh berdasarkan Perjanjian ini baik sebagian maupun seluruhnya kepada pihak lain tanpa persetujuan tertulis terlebih dahulu dari Pemberi Lisensi`], style: 'paragraph' }
              ]
            },
            {
              text: `Penerima Lisensi dengan ini juga menyatakan dan menjamin kepada Pemberi Lisensi bahwa setiap kerugian yang diderita oleh Pemberi Lisensi baik secara langsung maupun karena tuntutan pihak lain terutama tuntutan para pemegang hak milik intelektual sebagai akibat dari dilanggarnya salah satu atau lebih jaminan-jaminan Penerima Lisensi pada ayat 6.3 diatas maka kerugian itu sepenuhnya tanpa kecuali akan dipikul oleh Penerima Lisensi;`,
              style: 'paragraph',
              counter: 6.4
            },
            {
              text: `Jaminan-jaminan dalam Pasal ini merupakan bagian penting dari Perjanjian ini yang tanpa adanya jaminan demikian Perjanjian ini tidak akan diadakan.`,
              style: 'paragraph',
              counter: 6.5
            }
          ]
        }
      ],
      pageBreak: 'avoid'
    },
    
    // Simplifikasi pasal 7-15 untuk compact (keep structure but compact language)
    { text: 'Pasal 7', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'EKSKLUSIVITAS', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [`Sepanjang Masa Berlakunya Perjanjian dan sepanjang lisensi yang diberikan dalam Perjanjian ini berlaku Pemberi Lisensi tidak akan dengan nama dan dalam bentuk apapun memberi lisensi atas Konten "`, { text: judul, bold: true }, `" kepada pihak lain yang berada didalam Territori untuk melakukan eksploitasi sebagai mobile Konten begitu juga tidak akan memberi lisensi atas Konten "`, { text: judul, bold: true }, `" untuk platform sesuai lampiran 2 kepada pihak lain kecuali kepentingan eksploitasi dari Pemberi lisensi yang berada diluar Territori bisnis `, { text: pt, bold: true }, ` untuk melakukan eksploitasi pada aplikasi internet mobile atau gawai-gawai lain untuk dipasarkan kedalam Territori;`],
          style: 'paragraph',
          counter: 7.1
        },
        {
          text: [`Bahwa pemberian lisensi yang diberikan oleh pemberi lisensi atas Konten "`, { text: judul, bold: true }, `" kepada penerima lisensi adalah bersifat eksklusif diantara para pihak. Apabila dikemudian hari terdapat tuntutan dari pihak ketiga terkait pemberian lisensi ini maka pihak penerima lisensi tidak dapat dilibatkan sebagai pihak yang berperkara dan pemberi lisensi akan bertanggung jawab penuh terhadap segala kemungkinan tuntutan yang muncul dari pihak ketiga.`],
          style: 'paragraph',
          counter: 7.2
        },
        {
          text: [`Sepanjang Masa Berlakunya Perjanjian dan sepanjang lisensi yang diberikan dalam Perjanjian ini berlaku Pemberi Lisensi tidak akan dengan nama dan dalam bentuk apapun mengubah Konten "`, { text: judul, bold: true }, `" kedalam format digital untuk disajikan atau dipasarkan di dalam maupun di luar Territori`],
          style: 'paragraph',
          counter: 7.3
        }
      ],
      type: 'ordered'
    },
    
    { text: 'Pasal 8', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'FORCE MAJEURE', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: `Force majeure adalah suatu kejadian yang berada diluar kendali pihak yang mempunyai tanggung jawab untuk menjalankan suatu kewajiban berdasarkan Perjanjian ini, sedemikian rupa sehingga kewajiban itu tidak dapat dilaksanakan atau terhalang pelaksanaannya, termasuk tetapi tidak terbatas pada kejadian bencana alam, kerusuhan atau huru-hara, dikeluarkannya kebijakan pemerintah yang melarang pelaksanaan kewajiban demikian, dan perang sipil.`,
          style: 'paragraph',
          counter: 8.1
        },
        {
          text: `Jika ada force majeure yang menghalangi pelaksanaan suatu kewajiban berdasarkan Perjanjian ini wajib segera diberitahukan secara tertulis kepada pihak lainnya dalam tenggang waktu 2 (dua) hari sejak diketahui atau dialaminya force majeure itu, dengan menyebutkan dengan jelas peristiwa tersebut.`,
          style: 'paragraph',
          counter: 8.2
        },
        {
          text: `Kewajiban yang terhalang pelaksanaannya karena force majeure harus dilaksanakan atau dilaksanakan kembali seketika setelah halangan itu berakhir atau berkurang.`,
          style: 'paragraph',
          counter: 8.3
        }
      ],
      type: 'ordered'
    },
    
    {
      stack: [
        { text: 'Pasal 9', style: 'paragraph', alignment: 'center', bold: true },
        { text: 'BERAKHIR DAN DIAKHIRINYA PERJANJIAN', style: 'paragraph', alignment: 'center', bold: true },
        {
          ol: [
            { text: `Perjanjian ini akan berakhir dengan sendirinya ketika Masa Berlakunya Perjanjian berakhir;`, style: 'paragraph', counter: 9.1 },
            { text: `Perjanjian ini dapat diakhiri setiap saat melalui persetujuan pengakhiran yang diadakan secara tertulis oleh kedua belah pihak;`, style: 'paragraph', counter: 9.2 },
            {
              text: `Perjanjian ini dapat diakhiri lebih awal oleh salah satu pihak dengan cara memberitahukan secara tertulis kepada pihak lainnya paling sedikit 31 (tiga puluh satu) hari dimuka, apabila pihak yang belakangan :`,
              style: 'paragraph',
              counter: 9.3
            },
            {
              type: 'lower-alpha',
              ol: [
                { text: `melanggar ketentuan atau ketentuan-ketentuan dalam Perjanjian ini, dan tidak memperbaikinya dalam tenggang waktu yang ditetapkan dalam surat tegoran pertama yang diterbitkan oleh pihak yang terdahulu.`, style: 'paragraph', counter: 'a' },
                { text: `terhalang untuk melaksanakan suatu atau beberapa kewajiban dalam Perjanjian karena force majeure untuk waktu lebih dari 30 (tiga puluh) hari berturut-turut.`, style: 'paragraph', counter: 'b' },
                { text: `tidak menjalankan aktivitas bisnisnya untuk waktu lebih dari 14 (empat belas) hari berturut-turut.`, style: 'paragraph', counter: 'c' },
                { text: `mengajukan permohonan pailit atau penundaan pembayaran atau dimohonkan pailit oleh krediturnya.`, style: 'paragraph', counter: 'd' }
              ]
            },
            { text: `Masing-masing pihak dapat mengakhiri Perjanjian ini secara sepihak dan seketika dengan menyampaikan pemberitahuan tertulis kepada pihak lainnya apabila pihak yang lainnya melakukan pelanggaran atas ketentuan atau ketentuan-ketentuan jaminan tersebut pada Pasal 6 diatas;`, style: 'paragraph', counter: 9.4 },
            { text: `Untuk pengakhiran secara sepihak berdasarkan ketentuan dalam Pasal ini, Para Pihak dengan ini mengesampingkan ketentuan-ketentuan dalam Pasal 1266 dan Pasal 1267 Kitab Undang-undang Hukum Perdata Indonesia sepanjang mengenai diperlukannya izin dari hakim untuk pengakhiran suatu perjanjian.`, style: 'paragraph', counter: 9.5 },
            { text: `Setiap pengakhiran harus disertai dengan kewajiban untuk mengadakan serah terima teknis dan administratif selama 30 (tiga puluh) hari kerja sejak tanggal efektif pengakhiran, termasuk namun tidak terbatas pada pemutusan akses teknis, penghapusan salinan yang tidak berhak, dan pemberian laporan akhir;`, style: 'paragraph', counter: 9.6 },
            { text: `Pengakhiran tidak akan membebaskan pihak yang melakukan pelanggaran dari kewajiban untuk membayar semua utang, biaya yang masih harus dibayar, atau ganti rugi atas kerugian yang timbul akibat pelanggaran;`, style: 'paragraph', counter: 9.7 },
            { text: `Segala ketentuan dalam Perjanjian ini yang secara wajar dimaksudkan untuk tetap berlaku setelah pengakhiran, termasuk tetapi tidak terbatas pada ketentuan kerahasiaan, jaminan, dan penyelesaian perselisihan, akan tetap berlaku setelah pengakhiran;`, style: 'paragraph', counter: 9.8 }
          ]
        }
      ],
      pageBreak: 'before'
    },
    { text: `Pasal 10`, style: 'paragraph', alignment: 'center', bold: true },
    { text: `AKIBAT BERAKHIR DAN DIAKHIRINYA PERJANJIAN`, style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [
            "Sejak tanggal berakhir atau diakhirinya Perjanjian ini maka semua lisensi yang diberikan oleh Pemberi Lisensi kepada Penerima Lisensi atas Konten \"",
            { text: `${judul}`, style: "boldUppercase" },
            "\" sebagaimana dimaksud dalam Perjanjian ini menjadi berakhir oleh karenanya Penerima Lisensi tidak lagi berhak memasarkan atau menjual Konten \"",
            { text: `${judul}`, style: "boldUppercase" },
            "\" tersebut. Namun demi kepentingan pengguna akhir yang telah memperoleh akses secara sah, Penerima Lisensi wajib menyediakan mekanisme transisi dan/atau pemberitahuan kepada Pelanggan sesuai dengan ketentuan peraturan perlindungan konsumen yang berlaku;"
          ],
          style: "paragraph",
          counter: 10.1
        },
        {
          text: [
            "Menyimpang dari ketentuan pada ayat lalu pada pengakhiran perjanjian berdasarkan ketentuan dalam ayat 9.4 maka lisensi atas Konten \"",
            { text: `${judul}`, style: "boldUppercase" },
            "\" yang dengan ini diberikan oleh Pemberi Lisensi kepada Penerima Lisensi akan berakhir 31 (tiga puluh satu) hari setelah Perjanjian diakhiri; selama masa transisi tersebut Penerima Lisensi wajib menyelesaikan semua kewajiban keuangan dan administratif kepada Pemberi Lisensi;"
          ],
          style: "paragraph",
          counter: 10.2
        },
        {
          text: "Tindakan pengakhiran perjanjian berdasarkan ketentuan dalam ayat 9.3. dan 9.4. tidak mengurangi tanggung jawab pada pihak bersalah yang menyebabkan pengakhiran itu untuk memenuhi seluruh kewajiban keuangan yang terhutang berdasarkan perjanjian ini - jika ada- dan membayar ganti rugi atas kerugian yang diderita oleh pihak lainnya menurut hukum yang berlaku;",
          style: "paragraph",
          counter: 10.3
        },
        {
          text: "Para Pihak wajib mengadakan perhitungan dan pemberesan berkenaan dengan pelaksanaan perjanjian ini termasuk penyelesaian kewajiban keuangan yang timbul berdasarkan Perjanjian ini dalam tenggang waktu 30 (tiga puluh) hari terhitung tanggal berakhir atau diakhirinya perjanjian ini;",
          style: "paragraph",
          counter: 10.4
        },
        {
          text: "Berakhir atau diakhiri perjanjian ini tidak akan mengakhiri berlakunya ketentuan dalam Pasal 6 dan Pasal 11 Perjanjian ini.",
          style: "paragraph",
          counter: 10.5
        },
        {
          text: 'Dalam hal pengakhiran, Para Pihak berkewajiban untuk saling bekerja sama agar dampak terhadap pihak ketiga dan pelanggan diminimalkan, termasuk menyediakan dokumentasi teknis yang wajar jika diperlukan untuk pemutusan layanan;',
          style: 'paragraph',
          counter: 10.6
        }
      ]
    },
    {
      stack: [
        { text: 'Pasal 11', style: 'paragraph', alignment: 'center', bold: true, pageBreak: 'avoid' },
        { text: 'KERAHASIAAN', style: 'paragraph', alignment: 'center', bold: true },
        {
          ol: [
            {
              text: 'Para Pihak dengan ini satu terhadap lainnya berjanji untuk menjaga semua informasi dan data yang diperoleh pihak yang satu dari pihak lainnya dalam rangka mengadakan dan melaksanakan Perjanjian ini sebagai informasi dan data rahasia yang harus dijaga dengan sepatutnya untuk mencegah kebocoran dan tidak akan membuka atau dengan nama atau cara apapun membiarkan terbuka atau mengalihkan atau memberikan atau berbagi data dan informasi itu dengan pihak lain tanpa persetujuan tegas dan tertulis terlebih dahulu dari pihak yang memberikan data dan informasi itu;',
              style: 'paragraph',
              counter: 11.1
            },
            {
              text: 'Para Pihak dengan ini satu terhadap lainnya berjanji untuk tidak menggunakan atau memanfaatkan data dan informasi itu untuk tujuan atau kepentingan lain dari sekedar untuk mengadakan dan menjalankan syarat-syarat dalam Perjanjian ini;',
              style: 'paragraph',
              counter: 11.2
            },
            {
              text: 'Informasi dan data mengenai identitas Pelanggan yang diberikan atau secara teknis menjadi didapat atau dapat diakses oleh Pemberi-Lisensi akan berstatus sebagai data dan informasi rahasia yang dimaksud dalam Pasal ini.',
              style: 'paragraph',
              counter: 11.3
            },
            {
              text: 'Kewajiban kerahasiaan sebagaimana dimaksud pada ayat-ayat sebelumnya akan tetap berlaku setelah berakhirnya Perjanjian ini untuk jangka waktu 3 (tiga) tahun, kecuali apabila informasi tersebut menjadi pengetahuan umum bukan karena pelanggaran kewajiban oleh pihak penerima; ',
              style: 'paragraph',
              counter: 11.4
            },
            {
              text: 'Pengecualian kewajiban kerahasiaan: kewajiban tidak berlaku bila pengungkapan diwajibkan oleh hukum, pengadilan, atau otoritas berwenang, dengan syarat pihak yang diminta pengungkapan harus memberi pemberitahuan tertulis terlebih dahulu kepada pihak lainnya bila hal itu diperbolehkan oleh hukum;',
              style: 'paragraph',
              counter: 11.5
            }
          ]
        }
      ],
      pageBreak: 'avoid'
    },
    { text: 'Pasal 12', style: 'paragraph', alignment: 'center', bold: true, pageBreak: 'before' },
    { text: 'KETENTUAN TAMBAHAN', style: 'paragraph', alignment: 'center', bold: true },
    {
      stack: [
        {
          ol: [
            {
              text: 'Para Pihak dengan ini menetapkan bahwa ketentuan tambahan terhadap Perjanjian ini akan diuraikan pada Lampiran 1 dan menjadi bagian yang mengikat dari Perjanjian ini;',
              style: 'paragraph',
              counter: 12.1
            },
            {
              text: 'Kepatuhan terhadap peraturan perlindungan data: Para Pihak wajib menyelenggarakan proses dan kebijakan keamanan teknis dan organisasi yang wajar untuk melindungi data pribadi pelanggan sesuai dengan peraturan yang berlaku di Indonesia;',
              style: 'paragraph',
              counter: 12.2
            },
            {
              text: 'Hak audit: Pemberi Lisensi dapat, dengan pemberitahuan tertulis dan atas biaya sendiri, melakukan audit terbatas terhadap laporan keuangan terkait transaksi yang relevan yang disimpan oleh Penerima Lisensi sampai dengan 2 (dua) tahun setelah tanggal laporan tersebut;',
              style: 'paragraph',
              counter: 12.3
            },
            {
              text: 'Asuransi dan mitigasi risiko: Para Pihak dianjurkan untuk memiliki asuransi yang memadai untuk menutupi risiko komersial material yang relevan;',
              style: 'paragraph',
              counter: 12.4
            },
            {
              text: 'Penugasan: Tidak boleh melakukan pengalihan hak dan/atau kewajiban berdasarkan Perjanjian ini tanpa persetujuan tertulis terlebih dahulu dari pihak lainnya, kecuali kepada entitas yang mengakuisisi seluruh atau sebagian besar aset pihak yang menyetujui dan dengan syarat pihak penerima pengalihan tetap bertanggung jawab atas pelaksanaan kewajiban;',
              style: 'paragraph',
              counter: 12.5
            }
          ]
        }
      ],
      pageBreak: 'avoid'
    },
    { text: 'Pasal 13', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'LAIN-LAIN', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: 'Semua perjanjian atau kesepakatan yang diadakan sebelumnya diantara Para Pihak mengenai pokok Perjanjian ini dengan nama dan dalam bentuk apapun baik secara lisan maupun tertulis menjadi tidak berlaku lagi sejak ditandatanganinya Perjanjian ini kecuali sekedar kesepakatan atau perjanjian yang secara tegas dicantumkan dalam naskah Perjanjian ini;',
          style: 'paragraph',
          counter: 13.1
        },
        {
          text: 'Perubahan tambahan atau penggantian terhadap syarat-syarat atau bagian-bagian dari Perjanjian ini hanya sah dan mengikat apabila diadakan dengan persetujuan kedua belah pihak dan dituangkan dalam naskah yang ditandatangani oleh wakil-wakil yang sah dari masing-masing pihak;',
          style: 'paragraph',
          counter: 13.2
        },
        {
          text: 'Semua lampiran Perjanjian ini adalah merupakan bagian tetap dan essensial dari naskah Perjanjian ini.',
          style: 'paragraph',
          counter: 13.3
        },
        {
          text: 'Keterpisahan klausul: jika suatu ketentuan dalam Perjanjian ini dianggap tidak sah atau tidak dapat dilaksanakan oleh pengadilan yang berwenang, hal tersebut tidak akan mempengaruhi keabsahan klausul lainnya yang tetap berlaku.',
          style: 'paragraph',
          counter: 13.4
        }
      ]
    },
    { text: 'Pasal 14', style: 'paragraph', alignment: 'center', bold: true },
    { text: 'KOMUNIKASI', style: 'paragraph', alignment: 'center', bold: true },
    {
      ol: [
        {
          text: [
            'Semua komunikasi diantara Para Pihak mengenai Perjanjian ini dan pelaksanaannya akan dilakukan kealamat koresponden tersebut pada butir 10 ',
            { text: 'Lampiran 1', bold: true },
            ' Perjanjian ini;'
          ],
          style: 'paragraph',
          counter: 14.1
        },
        {
          text: 'Setiap perubahan alamat komunikasi harus diberitahukan kepada pihak lainnya 7 (tujuh) hari dimuka.',
          style: 'paragraph',
          counter: 14.2
        },
        {
          text: 'Pemberitahuan formal dapat disampaikan melalui surat tercatat, email yang tercantum di Lampiran 1, atau kurir yang memiliki bukti pengiriman. Pemberitahuan via email dianggap telah diterima pada hari kerja berikutnya apabila tidak ada pemberitahuan kegagalan pengiriman;',
          style: 'paragraph',
          counter: 14.3
        }
      ]
    },
    {
      stack: [
        {
          text: 'Pasal 15',
          style: 'paragraph',
          alignment: 'center',
          bold: true,
          pageBreak: 'before'
        },
        {
          text: 'PENYELESAIAN PERSELISIHAN',
          style: 'paragraph',
          alignment: 'center',
          bold: true
        },
        {
          ol: [
            {
              text: 'Perselisihan yang timbul diantara Para Pihak mengenai Perjanjian ini atau pelaksanaannya akan terlebih dahulu diselesaikan secara musyawarah dan itikad baik oleh wakil yang berwenang dari masing-masing pihak;',
              style: 'paragraph',
              counter: 15.1
            },
            {
              text: 'Jika musyawarah gagal diselesaikan dalam waktu 30 (tiga puluh) hari kalender sejak pemberitahuan tertulis mengenai perselisihan, Para Pihak sepakat untuk mengikuti mediasi yang difasilitasi oleh mediator independen yang disepakati bersama dalam waktu 30 (tiga puluh) hari kalender; jika mediasi gagal, maka para pihak dapat mengajukan perselisihan itu ke Badan Arbitrase Nasional Indonesia (BANI) di Jakarta sesuai dengan ketentuan-ketentuan dalam Undang-undang Nomor 30 tahun 1999 tentang Arbitrase dan Alternatif Penyelesaian Sengketa.',
              style: 'paragraph',
              counter: 15.2
            },
            {
              text: 'Selama proses penyelesaian perselisihan, Para Pihak tetap berkewajiban memenuhi kewajiban yang tidak menjadi pokok perselisihan, kecuali apabila disepakati lain secara tertulis;',
              style: 'paragraph',
              counter: 15.3
            },
            {
              text: 'Para Pihak setuju bahwa keputusan arbitrase yang final dan mengikat akan menjadi dasar pelaksanaan putusan dan dapat dilaksanakan melalui pengadilan yang berwenang;',
              style: 'paragraph',
              counter: 15.4
            },
            {
              text: 'Para Pihak berhak memperoleh relief sementara atau injunctive relief dari pengadilan negeri apabila diperlukan untuk mencegah kerugian yang tidak dapat diperbaiki selama proses penyelesaian, tanpa mengurangi ketentuan arbitrase di atas;',
              style: 'paragraph',
              counter: 15.5
            },
            {
              text: 'Biaya penyelesaian perselisihan akan ditanggung oleh pihak yang kalah, atau sebagaimana ditentukan oleh panel arbitrase.',
              style: 'paragraph',
              counter: 15.6
            }
          ]
        }
      ],
      pageBreak: 'avoid'
    },
    
    // removed blank forced page break to save one page
    
    // TANDA TANGAN
    { text: 'TANDA TANGAN PARA PIHAK', style: 'header', alignment: 'center' },
    { text: 'Perjanjian ini dibuat dan ditandatangani dalam rangkap dua ditandatangani oleh perwakilan yang sah dengan bermeterai cukup dan berlaku sebagai asli serta mempunyai kekuatan hukum yang sama.', style: 'paragraph', margin: [0, 0, 0, 30] },
    
    {
      columns: [
        {
          width: '50%',
          stack: [
            { text: 'PEMBERI LISENSI', bold: true, fontSize: 10 },
            { text: '\n\n\n___________________________', margin: [0, 30, 0, 0] },
            { text: toCamelCase(nama), margin: [0, 5, 0, 0] },
            { text: `(NIK: ${nik})`, fontSize: 9 }
          ]
        },
        {
          width: '50%',
          stack: [
            { text: 'PENERIMA LISENSI', bold: true, fontSize: 10, alignment: 'right' },
            { text: pt, bold: true, fontSize: 9, alignment: 'right', margin: [0, 5, 0, 0] },
            { text: '\n\n\n___________________________', alignment: 'right', margin: [0, 30, 0, 0] },
            { text: 'Lay Laberto', alignment: 'right', margin: [0, 5, 0, 0] },
            { text: 'Direktur', alignment: 'right', fontSize: 9 }
          ]
        }
      ]
    },
    
    // removed blank forced page break to save one page
    
    // LAMPIRAN 1
    { text: 'LAMPIRAN 1', style: 'header', alignment: 'center' },
    { text: 'PERINCIAN PERJANJIAN', style: 'subheader', alignment: 'center' },
    
    {
      style: 'tableExample',
      table: {
        widths: ['30%', '70%'],
        headerRows: 0,
        body: [
          [{ text: 'Territory', bold: true }, 'Republik Indonesia'],
          [{ text: 'Format', bold: true }, 'Konten Musik Full Track & Voice Content'],
          [{ text: 'Platform', bold: true }, 'Meta, Youtube, dan saluran distribusi digital lainnya'],
          [{ text: 'Media', bold: true }, 'Mobile telephone, website, dan semua media digital yang memungkinkan'],
          [{ text: 'Periode', bold: true }, '2 (Dua) Tahun'],
          [{ text: 'Tipe Lisensi', bold: true }, 'Eksklusif'],
          [{ text: 'Konten', bold: true }, judul],
          [{ text: 'Pencipta', bold: true }, pencipta],
          [{ text: 'Bagi Hasil', bold: true }, `30% Penerima ${pt}, 70% Pemberi ${toCamelCase(nama)}`]
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 0, 0, 20]
    },
    
    { text: 'ALAMAT KOMUNIKASI PEMBERI LISENSI:', bold: true, margin: [0, 10, 0, 8] },
    {
      style: 'tableExample',
      table: {
        widths: ['25%', '75%'],
        body: [
          [{ text: 'Nama', bold: true }, toCamelCase(nama)],
          [{ text: 'Email', bold: true }, imail],
          [{ text: 'Telepon', bold: true }, phone],
          [{ text: 'No. Rekening', bold: true }, norek],
          [{ text: 'A/N', bold: true }, asNama],
          [{ text: 'Bank', bold: true }, bankName],
          [{ text: 'NPWP', bold: true }, npwp],
          [{ text: 'Alamat', bold: true }, address]
        ]
      },
      layout: 'lightHorizontalLines'
    },
    
    // removed blank forced page break to save one page
    
    // LAMPIRAN 2
    { text: 'LAMPIRAN 2', style: 'header', alignment: 'center' },
    { text: 'DAFTAR KONTEN LISENSI', style: 'subheader', alignment: 'center' },
    
    {
      style: 'tableExample',
      table: {
        widths: ['15%', '30%', '30%', '25%'],
        headerRows: 1,
        body: [
          [
            { text: 'No.', bold: true, alignment: 'center' },
            { text: 'Judul Konten', bold: true },
            { text: 'Pencipta', bold: true },
            { text: 'Format', bold: true, alignment: 'center' }
          ],
          ['1', judul, pencipta, 'Audio/MP3']
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 0, 0, 15]
    },
    
    {
      text: `Keterangan:\n• Konten ini disimpan dalam server aplikasi Penerima Lisensi\n• Format delivery: MP3, Streaming\n• Akses: Unlimited selama Masa Berlakunya Perjanjian\n• Update: Sesuai kesepakatan bersama Para Pihak`,
      style: 'paragraph'
    }
  ];

  const docDefinition = {
    content: content,
    styles: {
      header: { fontSize: 14, bold: true, margin: [0, 10, 0, 8] },
      subheader: { fontSize: 11, margin: [0, 8, 0, 4] },
      paragraph: { fontSize: 10, margin: [0, 3, 0, 3], alignment: 'justify' },
      footer: { fontSize: 9, margin: [0, 6, 0, 6] },
      tableExample: { margin: [0, 3, 0, 3] }
    },
    pageMargins: [36, 60, 36, 36],
    footer: function (currentPage, pageCount) {
      return {
        columns: [
          { text: 'RAHASIA', bold: true, alignment: 'left', margin: [70, 10, 0, 0] },
          { text: `Halaman ${currentPage} dari ${pageCount}`, alignment: 'center', margin: [-50, 10, 0, 0] }
        ]
      };
    }
  };

  return new Promise((resolve, reject) => {
    try {
      const pdf = pdfMake.createPdf(docDefinition);
      pdf.getBuffer((buffer) => {
        console.log('[PDF Service] Generated: ' + (buffer.length / 1024).toFixed(2) + ' KB');
        resolve(buffer);
      });
    } catch (error) {
      console.error('[PDF Service] Error:', error.message);
      reject(error);
    }
  });
}
