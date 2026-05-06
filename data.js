// Kütüphane verisi
// Yeni koleksiyon eklemek için: aşağıdaki "collections" dizisine yeni bir nesne ekleyin.
// Yeni kitap eklemek için: ilgili koleksiyonun "books" dizisine yeni bir nesne ekleyin.

const LIBRARY_DATA = {
  collections: [
    {
      id: "harry-potter",
      title: "Harry Potter Serisi",
      author: "J.K. Rowling",
      description: "Büyücülük dünyasının kapılarını aralayan, dostluk, cesaret ve sihirle dolu sekiz kitaplık efsanevi seri.",
      accent: "#7a5230",
      folder: "kitaplar/harry-potter-serisi",
      coverFolder: "kitaplar/harry-potter-serisi/kapaklar",
      books: [
        {
          id: "hp1",
          title: "Felsefe Taşı",
          subtitle: "Harry Potter ve Felsefe Taşı",
          number: 1,
          file: "harry-potter-1.pdf",
          cover: "harry-potter-1.jpg"
        },
        {
          id: "hp2",
          title: "Sırlar Odası",
          subtitle: "Harry Potter ve Sırlar Odası",
          number: 2,
          file: "harry-potter-2.pdf",
          cover: "harry-potter-2.jpg"
        },
        {
          id: "hp3",
          title: "Azkaban Tutsağı",
          subtitle: "Harry Potter ve Azkaban Tutsağı",
          number: 3,
          file: "harry-potter-3.pdf",
          cover: "harry-potter-3.jpg"
        },
        {
          id: "hp4",
          title: "Ateş Kadehi",
          subtitle: "Harry Potter ve Ateş Kadehi",
          number: 4,
          file: "harry-potter-4.pdf",
          cover: "harry-potter-4.jpg"
        },
        {
          id: "hp5",
          title: "Zümrüdüanka Yoldaşlığı",
          subtitle: "Harry Potter ve Zümrüdüanka Yoldaşlığı",
          number: 5,
          file: "harry-potter-5.pdf",
          cover: "harry-potter-5.jpg"
        },
        {
          id: "hp6",
          title: "Melez Prens",
          subtitle: "Harry Potter ve Melez Prens",
          number: 6,
          file: "harry-potter-6.pdf",
          cover: "harry-potter-6.jpg"
        },
        {
          id: "hp7",
          title: "Ölüm Yadigârları",
          subtitle: "Harry Potter ve Ölüm Yadigârları",
          number: 7,
          file: "harry-potter-7.pdf",
          cover: "harry-potter-7.jpg"
        },
        {
          id: "hp8",
          title: "Lanetli Çocuk",
          subtitle: "Harry Potter ve Lanetli Çocuk",
          number: 8,
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
      folder: "kitaplar/kutsal-kitaplar",
      coverFolder: "kitaplar/kutsal-kitaplar/kapaklar",
      books: [
        {
          id: "kuran",
          title: "Kur'an-ı Kerim",
          subtitle: "Kur'an-ı Kerim Meali",
          file: "kuran.pdf",
          cover: "kuran.jpg"
        },
        {
          id: "tevrat",
          title: "Tevrat",
          subtitle: "Tevrat",
          file: "tevrat.pdf",
          cover: "tevrat.jpg"
        },
        {
          id: "incil",
          title: "İncil",
          subtitle: "İncil Meali",
          file: "incil.pdf",
          cover: "incil.jpg"
        },
        {
          id: "zebur",
          title: "Zebur",
          subtitle: "Zebur - Mezmurlar",
          file: "zebur.pdf",
          cover: "zebur.jpg"
        }
      ]
    },
    {
      id: "saftirik",
      title: "Saftirik Serisi",
      author: "Jeff Kinney",
      description: "Greg Heffley'in komik ve sıra dışı günlüklerinden oluşan, çocuklar ve gençler için sevilen mizah serisi.",
      accent: "#c0392b",
      folder: "kitaplar/saftirik-serisi",
      coverFolder: "kitaplar/saftirik-serisi/kapaklar",
      books: [
        {
          id: "saftirik1",
          title: "Greg'in Günlüğü",
          subtitle: "Saftirik - Greg'in Günlüğü 1",
          number: 1,
          file: "saftirik-1.pdf",
          cover: "saftirik-1.jpg"
        }
      ]
    },
    {
      id: "yuzuklerin-efendisi",
      title: "Yüzüklerin Efendisi",
      author: "J.R.R. Tolkien",
      description: "Orta Dünya'nın efsanevi destanı: Hobbit'ten Silmarillion'a uzanan Tolkien evreninin başyapıtları.",
      accent: "#3a5a40",
      folder: "kitaplar/yuzuklerin-efendisi",
      coverFolder: "kitaplar/yuzuklerin-efendisi/kapaklar",
      books: [
        {
          id: "hobbit",
          title: "Hobbit",
          subtitle: "Hobbit ya da Gittik ve Döndük",
          file: "hobbit.pdf",
          cover: "hobbit.jpg"
        },
        {
          id: "iki-kule",
          title: "İki Kule",
          subtitle: "Yüzüklerin Efendisi - İki Kule",
          file: "iki-kule.pdf",
          cover: "iki-kule.jpg"
        },
        {
          id: "silmarillion",
          title: "Silmarillion",
          subtitle: "Silmarillion",
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
      folder: "kitaplar/tekli-kitaplar",
      coverFolder: "kitaplar/tekli-kitaplar/kapaklar",
      books: [
        {
          id: "insan-ne-ile-yasar",
          title: "İnsan Ne ile Yaşar",
          subtitle: "İnsan Ne ile Yaşar - Lev Nikolayeviç Tolstoy",
          file: "insan-ne-ile-yasar.pdf",
          cover: "insan-ne-ile-yasar.jpg"
        },
        {
          id: "alice",
          title: "Alice Harikalar Diyarında",
          subtitle: "Alice Harikalar Diyarında - Lewis Carroll",
          file: "alice.pdf",
          cover: "alice.jpg"
        },
        {
          id: "hayvan-ciftligi",
          title: "Hayvan Çiftliği",
          subtitle: "Hayvan Çiftliği - George Orwell",
          file: "hayvan-ciftligi.pdf",
          cover: "hayvan-ciftligi.jpg"
        },
        {
          id: "pinokyo",
          title: "Pinokyo",
          subtitle: "Pinokyo - Carlo Collodi",
          file: "pinokyo.pdf",
          cover: "pinokyo.jpg"
        },
        {
          id: "satranc",
          title: "Satranç",
          subtitle: "Satranç - Stefan Zweig",
          file: "satranc.pdf",
          cover: "satranc.webp"
        },
        {
          id: "beyaz-geceler",
          title: "Beyaz Geceler",
          subtitle: "Beyaz Geceler - Dostoyevski",
          file: "beyaz-geceler.pdf",
          cover: "beyaz-geceler.jpg"
        },
        {
          id: "1984",
          title: "1984",
          subtitle: "1984 - George Orwell",
          file: "1984.pdf",
          cover: "1984.jpg"
        },
        {
          id: "kucuk-prens",
          title: "Küçük Prens",
          subtitle: "Küçük Prens - Antoine de Saint-Exupéry",
          file: "kucuk-prens.pdf",
          cover: "kucuk-prens.jpg"
        },
        {
          id: "dovus-kulubu",
          title: "Dövüş Kulübü",
          subtitle: "Dövüş Kulübü - Chuck Palahniuk",
          file: "dovus-kulubu.pdf",
          cover: "dovus-kulubu.jpg"
        },
        {
          id: "atomik-aliskanliklar",
          title: "Atomik Alışkanlıklar",
          subtitle: "Atomik Alışkanlıklar - James Clear",
          file: "atomik-aliskanliklar.pdf",
          cover: "atomik-aliskanliklar.jpg"
        }
      ]
    }
  ]
};
