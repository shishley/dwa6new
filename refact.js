import { BOOKS_PER_PAGE, authors, genres, books } from './data.js'

class BookList {
  constructor(books) {
    this.books = books
    this.page = 1
    this.matches = books
  }

  getResults(filters) {
    const result = []

    for (const book of this.books) {
      let genreMatch = filters.genre === 'any'

      for (const singleGenre of book.genres) {
        if (genreMatch) break;
        if (singleGenre === filters.genre) { genreMatch = true }
      }

      if (
        (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
        (filters.author === 'any' || book.author === filters.author) &&
        genreMatch
      ) {
        result.push(book)
      }
    }

    return result
  }

  render() {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of this.matches.slice(this.page * BOOKS_PER_PAGE, (this.page + 1) * BOOKS_PER_PAGE)) {
      const element = document.createElement('button')
      element.classList = 'preview'
      element.setAttribute('data-preview', id)

      element.innerHTML = `
        <img
          class="preview__image"
          src="${image}"
        />

        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `

      fragment.appendChild(element)
    }

    document.querySelector('[data-list-items]').appendChild(fragment)
  }

  showMore() {
    if (this.matches.length > (this.page + 1) * BOOKS_PER_PAGE) {
      this.page += 1
      this.render()
    }
  }

  onPreviewClick(event) {
    const preview = event.target.closest('.preview')
    const book = this.books.find(book => book.id === preview.dataset.preview)

    if (book) {
      document.querySelector('[data-list-active]').open = true
      document.querySelector('[data-list-blur]').src = book.image
      document.querySelector('[data-list-image]').src = book.image
      document.querySelector('[data-list-title]').innerText = book.title
      document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`
      document.querySelector('[data-list-description]').innerText = book.description
    }
  }
}

const bookList = new BookList(books)

document.querySelector('[data-list-items]').addEventListener('click', bookList.onPreviewClick)

document.querySelector('[data-list-button]').addEventListener('click', bookList.showMore)
