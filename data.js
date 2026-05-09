// Kütüphane verisi
// Yeni koleksiyon eklemek için: aşağıdaki "collections" dizisine yeni bir nesne ekleyin.
// Yeni kitap eklemek için: ilgili koleksiyonun "books" dizisine yeni bir nesne ekleyin.
//
// Kitap meta veri alanları (hepsi opsiyonel):
//   year:             Orijinal yayın yılı (sayı)
//   pages:            Yaklaşık sayfa sayısı (sayı)
//   originalLanguage: Eserin orijinal dili (string, ör. "İngilizce")
//   tags:             Kitap özel etiketleri (varsa koleksiyonun tag'lerini ezer)

const LIBRARY_DATA = {
  collections: [
    {
      id: "harry-potter",
      title: "Harry Potter Serisi",
      author: "J.K. Rowling",
      description: "Büyücülük dünyasının kapılarını aralayan, dostluk, cesaret ve sihirle dolu sekiz kitaplık efsanevi seri.",
      accent: "#7a5230",
      tags: ["fantastik", "roman", "seri"],
      folder: "kitaplar/harry-potter-serisi",
      coverFolder: "kitaplar/harry-potter-serisi/kapaklar",
      books: [
        {
          id: "hp1",
          title: "Felsefe Taşı",
          subtitle: "Harry Potter ve Felsefe Taşı",
          number: 1,
          year: 1997,
          pages: 240,
          originalLanguage: "İngilizce",
          file: "harry-potter-1.pdf",
          cover: "harry-potter-1.jpg"
        },
        {
          id: "hp2",
          title: "Sırlar Odası",
          subtitle: "Harry Potter ve Sırlar Odası",
          number: 2,
          year: 1998,
          pages: 280,
          originalLanguage: "İngilizce",
          file: "harry-potter-2.pdf",
          cover: "harry-potter-2.jpg"
        },
        {
          id: "hp3",
          title: "Azkaban Tutsağı",
          subtitle: "Harry Potter ve Azkaban Tutsağı",
          number: 3,
          year: 1999,
          pages: 380,
          originalLanguage: "İngilizce",
          file: "harry-potter-3.pdf",
          cover: "harry-potter-3.jpg"
        },
        {
          id: "hp4",
          title: "Ateş Kadehi",
          subtitle: "Harry Potter ve Ateş Kadehi",
          number: 4,
          year: 2000,
          pages: 640,
          originalLanguage: "İngilizce",
          file: "harry-potter-4.pdf",
          cover: "harry-potter-4.jpg"
        },
        {
          id: "hp5",
          title: "Zümrüdüanka Yoldaşlığı",
          subtitle: "Harry Potter ve Zümrüdüanka Yoldaşlığı",
          number: 5,
          year: 2003,
          pages: 850,
          originalLanguage: "İngilizce",
          file: "harry-potter-5.pdf",
          cover: "harry-potter-5.jpg"
        },
        {
          id: "hp6",
          title: "Melez Prens",
          subtitle: "Harry Potter ve Melez Prens",
          number: 6,
          year: 2005,
          pages: 600,
          originalLanguage: "İngilizce",
          file: "harry-potter-6.pdf",
          cover: "harry-potter-6.jpg"
        },
        {
          id: "hp7",
          title: "Ölüm Yadigârları",
          subtitle: "Harry Potter ve Ölüm Yadigârları",
          number: 7,
          year: 2007,
          pages: 615,
          originalLanguage: "İngilizce",
          file: "harry-potter-7.pdf",
          cover: "harry-potter-7.jpg"
        },
        {
          id: "hp8",
          title: "Lanetli Çocuk",
          subtitle: "Harry Potter ve Lanetli Çocuk",
          number: 8,
          year: 2016,
          pages: 320,
          originalLanguage: "İngilizce",
          file: "harry-potter-8.pdf",
          cover: "harry-potter-8.jpg"
        }
      ]
    },
    {
      id: "kutsal-kitaplar",
      title: "Kutsal Kitaplar",
      author: "Semavi Dinler",
      description: "Üç büyük semavi dinin temel metinleri: Kur'an-ı Kerim Meali, Tevrat, Zebur ve İncil Meali.",
      accent: "#2f5d3a",
      tags: ["dini"],
      folder: "kitaplar/kutsal-kitaplar",
      coverFolder: "kitaplar/kutsal-kitaplar/kapaklar",
      books: [
        {
          id: "kuran",
          title: "Kur'an-ı Kerim",
          subtitle: "Kur'an-ı Kerim Meali",
          originalLanguage: "Arapça",
          file: "kuran.pdf",
          cover: "kuran.jpg"
        },
        {
          id: "tevrat",
          title: "Tevrat",
          subtitle: "Tevrat",
          originalLanguage: "İbranice",
          file: "tevrat.pdf",
          cover: "tevrat.jpg"
        },
        {
          id: "incil",
          title: "İncil",
          subtitle: "İncil Meali",
          originalLanguage: "Yunanca",
          file: "incil.pdf",
          cover: "incil.jpg"
        },
        {
          id: "zebur",
          title: "Zebur",
          subtitle: "Zebur - Mezmurlar",
          originalLanguage: "İbranice",
          file: "zebur.pdf",
          cover: "zebur.jpg"
        }
      ]
    },
    {
      id: "yuzuklerin-efendisi",
      title: "Yüzüklerin Efendisi",
      author: "J.R.R. Tolkien",
      description: "Orta Dünya'nın efsanevi destanı: Yüzüklerin Efendisi üçlemesi tek ciltte, Hobbit ve Silmarillion ile birlikte Tolkien evreninin başyapıtları.",
      accent: "#3a5a40",
      tags: ["fantastik", "roman", "klasik"],
      folder: "kitaplar/yuzuklerin-efendisi",
      coverFolder: "kitaplar/yuzuklerin-efendisi/kapaklar",
      books: [
        {
          id: "yuzuklerin-efendisi-tekcilt",
          title: "Yüzüklerin Efendisi",
          subtitle: "Yüzüklerin Efendisi - Tek Cilt (Üçleme)",
          year: 1954,
          pages: 1200,
          originalLanguage: "İngilizce",
          file: "J.R.R.-Tolkien-Yuzuklerin-Efendisi_compressed.pdf",
          cover: "tekcilt.jpg"
        },
        {
          id: "hobbit",
          title: "Hobbit",
          subtitle: "Hobbit ya da Gittik ve Döndük - J.R.R. Tolkien",
          year: 1937,
          pages: 320,
          originalLanguage: "İngilizce",
          file: "hobbit.pdf",
          cover: "hobbit.jpg"
        },
        {
          id: "silmarillion",
          title: "Silmarillion",
          subtitle: "Silmarillion - J.R.R. Tolkien",
          year: 1977,
          pages: 380,
          originalLanguage: "İngilizce",
          file: "silmarillion.pdf",
          cover: "silmarillion.jpg"
        }
      ]
    },
    {
      id: "tekli-kitaplar",
      title: "Tekli Kitaplar",
      author: "Çeşitli Yazarlar",
      description: "Dünya edebiyatından seçme tek ciltlik klasikler ve modern eserler.",
      accent: "#5b3a8a",
      tags: ["klasik"],
      folder: "kitaplar/tekli-kitaplar",
      coverFolder: "kitaplar/tekli-kitaplar/kapaklar",
      books: [
        {
          id: "insan-ne-ile-yasar",
          title: "İnsan Ne ile Yaşar",
          subtitle: "İnsan Ne ile Yaşar - Lev Nikolayeviç Tolstoy",
          year: 1881,
          pages: 80,
          originalLanguage: "Rusça",
          tags: ["klasik", "felsefe"],
          file: "insan-ne-ile-yasar.pdf",
          cover: "insan-ne-ile-yasar.jpg"
        },
        {
          id: "alice",
          title: "Alice Harikalar Diyarında",
          subtitle: "Alice Harikalar Diyarında - Lewis Carroll",
          year: 1865,
          pages: 160,
          originalLanguage: "İngilizce",
          tags: ["klasik", "roman", "çocuk"],
          file: "alice.pdf",
          cover: "alice.jpg"
        },
        {
          id: "hayvan-ciftligi",
          title: "Hayvan Çiftliği",
          subtitle: "Hayvan Çiftliği - George Orwell",
          year: 1945,
          pages: 150,
          originalLanguage: "İngilizce",
          tags: ["klasik", "roman", "distopya"],
          file: "hayvan-ciftligi.pdf",
          cover: "hayvan-ciftligi.jpg"
        },
        {
          id: "pinokyo",
          title: "Pinokyo",
          subtitle: "Pinokyo - Carlo Collodi",
          year: 1881,
          pages: 200,
          originalLanguage: "İtalyanca",
          tags: ["klasik", "roman", "çocuk"],
          file: "pinokyo.pdf",
          cover: "pinokyo.jpg"
        },
        {
          id: "satranc",
          title: "Satranç",
          subtitle: "Satranç - Stefan Zweig",
          year: 1942,
          pages: 90,
          originalLanguage: "Almanca",
          tags: ["klasik", "roman"],
          file: "satranc.pdf",
          cover: "satranc.webp"
        },
        {
          id: "beyaz-geceler",
          title: "Beyaz Geceler",
          subtitle: "Beyaz Geceler - Dostoyevski",
          year: 1848,
          pages: 100,
          originalLanguage: "Rusça",
          tags: ["klasik", "roman"],
          file: "beyaz-geceler.pdf",
          cover: "beyaz-geceler.jpg"
        },
        {
          id: "1984",
          title: "1984",
          subtitle: "1984 - George Orwell",
          year: 1949,
          pages: 350,
          originalLanguage: "İngilizce",
          tags: ["klasik", "roman", "distopya"],
          file: "1984.pdf",
          cover: "1984.jpg"
        },
        {
          id: "kucuk-prens",
          title: "Küçük Prens",
          subtitle: "Küçük Prens - Antoine de Saint-Exupéry",
          year: 1943,
          pages: 100,
          originalLanguage: "Fransızca",
          tags: ["klasik", "çocuk"],
          file: "kucuk-prens.pdf",
          cover: "kucuk-prens.jpg"
        },
        {
          id: "dovus-kulubu",
          title: "Dövüş Kulübü",
          subtitle: "Dövüş Kulübü - Chuck Palahniuk",
          year: 1996,
          pages: 230,
          originalLanguage: "İngilizce",
          tags: ["roman"],
          file: "dovus-kulubu.pdf",
          cover: "dovus-kulubu.jpg"
        },
        {
          id: "atomik-aliskanliklar",
          title: "Atomik Alışkanlıklar",
          subtitle: "Atomik Alışkanlıklar - James Clear",
          year: 2018,
          pages: 320,
          originalLanguage: "İngilizce",
          tags: ["kişisel-gelişim"],
          file: "atomik-aliskanliklar.pdf",
          cover: "atomik-aliskanliklar.jpg"
        },
        {
          id: "fahrenheit-451",
          title: "Fahrenheit 451",
          subtitle: "Fahrenheit 451 - Ray Bradbury",
          year: 1953,
          pages: 220,
          originalLanguage: "İngilizce",
          tags: ["klasik", "roman", "distopya"],
          file: "Fahrenheit 451.pdf",
          cover: "fahrenheit451.webp"
        },
        {
          id: "bir-idam-mahkumunun-son-gunu",
          title: "Bir İdam Mahkumunun Son Günü",
          subtitle: "Bir İdam Mahkumunun Son Günü - Victor Hugo",
          year: 1829,
          pages: 130,
          originalLanguage: "Fransızca",
          tags: ["klasik", "roman"],
          file: "bir-idam-mahkumunun-son-günü.pdf",
          cover: "idam makumu son günü.jpg"
        },
        {
          id: "fareler-ve-insanlar",
          title: "Fareler ve İnsanlar",
          subtitle: "Fareler ve İnsanlar - John Steinbeck",
          year: 1937,
          pages: 130,
          originalLanguage: "İngilizce",
          tags: ["klasik", "roman"],
          file: "fareler-ve-insanlar.pdf",
          cover: "fareler ve insanlar.webp"
        },
        {
          id: "hamlet",
          title: "Hamlet",
          subtitle: "Hamlet - William Shakespeare",
          year: 1603,
          pages: 200,
          originalLanguage: "İngilizce",
          tags: ["klasik", "tiyatro"],
          file: "hamlet.pdf",
          cover: "hamlet.jpg"
        },
        {
          id: "masumiyet-muzesi",
          title: "Masumiyet Müzesi",
          subtitle: "Masumiyet Müzesi - Orhan Pamuk",
          year: 2008,
          pages: 600,
          originalLanguage: "Türkçe",
          tags: ["roman"],
          file: "masumiyet-müzesi.pdf",
          cover: "masumiyet müzesi.jpg"
        },
        {
          id: "psikiyatrist",
          title: "Psikiyatrist",
          subtitle: "Psikiyatrist - Machado de Assis",
          year: 1882,
          pages: 90,
          originalLanguage: "Portekizce",
          tags: ["klasik", "roman"],
          file: "pisikiyatrist.pdf",
          cover: "pisikiyatrist.jpg"
        },
        {
          id: "yasamak",
          title: "Yaşamak",
          subtitle: "Yaşamak - Yu Hua",
          year: 1993,
          pages: 250,
          originalLanguage: "Çince",
          tags: ["roman"],
          file: "yasamak.pdf",
          cover: "yaşamak.webp"
        },
        {
          id: "dokunmadan",
          title: "Dokunmadan",
          subtitle: "Dokunmadan",
          tags: ["roman"],
          file: "dokunmadan.pdf",
          cover: "dokunmadan.jpg"
        }
      ]
    }
  ]
};
