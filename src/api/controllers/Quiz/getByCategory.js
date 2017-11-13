export default category => {
  return {
    category: category,
    questions: [
      {
        id: 'ab1234',
        question: 'What is the name of Muse’s first album?',
        options: [
          'Absolution',
          'Showbiz',
          'The 2nd Law',
          'Black Holes and Revelations'
        ]
      }, {
        id: 'ab1235',
        question: 'Who released the album Master Of Puppets?',
        options: [
          'Iron Maiden',
          'Metallica',
          'Megadeth',
          'Black Sabbath'
        ]
      }, {
        id: 'ab1236',
        question: 'What is the best-selling album of all time? (most sold copies)',
        options: [
          'Thriller, Michael Jackson',
          'Hotel California, Eagles',
          'Abbey Road, The Beatles',
          'The Wall, Pink Floyd'
        ]
      }, {
        id: 'ab1237',
        question: 'Who wrote the song Brothers in Arms?',
        options: [
          'Deep Purple',
          'Pink Floyd',
          'The Who',
          'Dire Straits'
        ]
      }
    ]
  }
}
