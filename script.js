(function(scope){
    var ConfigurableSwatches = function (selector) {

        //grab our config swatches wrapper
        var productWrapper = document.querySelector(selector),
            selects = productWrapper.querySelectorAll('select');

        //generate ul with a node count of count
        var generateList = function (count) {
            var ul = document.createElement('ul');
            for (var i = 0; i < count; i++) {
                ul.appendChild(document.createElement('li'));
            }
            return ul;
        };

        //grab the text from the options and hide them
        var populateLists = function () {
            Array.prototype.slice.call(selects).forEach(function (select) {
                var options = select.querySelectorAll('option:not(:first-child)');
                var ul = generateList(options.length),
                    li = ul.querySelectorAll('li');
                Array.prototype.slice.call(options).forEach(function (option, index) {
                    li[index].textContent = option.textContent;
                    li[index].setAttribute('data-index', index);
                });
                select.parentNode.appendChild(ul);
                //hide selects
                hideElement(select);
            });
        };

        var hideElement = function (element) {
            element.style.display = 'none';
        };

        var setUpEvents = function () {
            Array.prototype.slice.call(productWrapper.querySelectorAll('li')).forEach(function (li) {
                li.addEventListener('click', triggerSelect);
            });
        };

        var triggerSelect = function (e) {
            var li = e.target;
            var options = productWrapper.querySelectorAll('option');
            for (var i = 0, j = options.length; i < j; i++) {
                if (options[i].textContent == li.textContent) {
                    options[i].setAttribute('selected', 'selected');
                    options[i].parentNode.dispatchEvent(new Event('change'));
                }
            }
        };

        //our only public fn
        this.init = function () {
            populateLists();
            setUpEvents();
        }
    };

    scope.ConfigurableSwatches = typeof scope.ConfigurableSwatches === 'undefined' ? ConfigurableSwatches : scope.ConfigurableSwatches;
}(window));
