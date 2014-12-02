var app = app || {};

app.controller = (function () {
    function Controller(dataPersister) {
        this.persister = dataPersister;
    }

    Controller.prototype.load = function (selector) {
        var _this = this;
        this.attachEvents();
        this.persister.books.getAll(
            function (data) {
                _this.loadBooks(data);
            },
            function (error) {
                console.log(error);
            }
        );
    }

    function attachBookToDom(element, book) {
        var bookWrapper = $('<div />');
        bookWrapper.attr('data-id', book.objectId);
        var title = $('<div />').append('Title: ' + book.title);
        var author = $('<div />').append('Author: ' + book.author);
        var isbn = $('<div />').append('ISBN: ' + book.isbn);
        var deleteButton = $('<button class="book-delete-btn">Delete</button>');

        bookWrapper.append(title);
        bookWrapper.append(author);
        bookWrapper.append(isbn);
        bookWrapper.append(deleteButton);
        element.append(bookWrapper);
    }

    Controller.prototype.loadBooks = function (data) {
        var selector = '#all-books';
        var allBookWrapper = $(selector);
        for (var i = 0; i < data.count; i++) {
            var book = data.books[i];
            attachBookToDom(allBookWrapper, book);
        };
    }

    Controller.prototype.attachEvents = function () {
        var _this = this;
        $('#add-book').on('click', function (ev) {
            var book = {
                title: $('#title').val(),
                author: $('#author').val(),
                isbn: $('#isbn').val()
            }

            _this.persister.books.add(book,
                function addBookSuccessHandler(data) {
                    var booksWrapper = $('#all-books');
                    attachBookToDom(booksWrapper, data);
                },
                function addBookErrorHandler(error) {
                    console.log(error);
                }
            )
        });

        $('#all-book').on('click', '.book-delete-btn', function (ev) {
            var objectId = $(this).parent().attr('data-id');
            _this.persister.books.delete(
                objectId,
                function (data) {
                    $(ev.target).parent().remove();
                },
                function (error) {
                    console.log(error);
                }
            )
        })
    }

    return {
        get: function (dataPersister) {
            return new Controller(dataPersister);
        }
    }
}())