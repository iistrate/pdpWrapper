(function(scope){
    var SelectWrapper = function (selector, style, callback, grabAttributes, triggerOpt) {

        //grab our config swatches wrapper
        var productWrapper = document.querySelector(selector),
            selects        = productWrapper.querySelectorAll('select'),
            selectedOption = [],
            type           = 'regular' || style,
            callback       = callback || null,
            grabAttributes = grabAttributes || false,
            triggerOpt     = triggerOpt || null;


        //generate ul with a node count of count
        var generateList = function (count) {
            var ul = document.createElement('ul');
            for (var i = 0; i < count; i++) {
                var li = document.createElement('li');
                    li.appendChild(document.createElement('span'));
                    ul.appendChild(li);
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
                    li[index].firstElementChild.textContent = option.textContent;
                    if (grabAttributes) {
                        for (var i = 0, j = option.attributes.length; i < j; i++) {
                            var attr = option.attributes[i];
                            li[index].setAttribute(attr.name, attr.value);
                        }
                    }
                    if (index===0) {
                        li[index].className = 'active';
                    }
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
                li.addEventListener('click', triggerSelect, false);
            });
        };

        var triggerSelect = function (e) {
            var li = e.target.tagName === 'LI' ? e.target : e.target.parentNode;
            var options = productWrapper.querySelectorAll('option');
            for (var i = 0, j = options.length; i < j; i++) {
                if (options[i].textContent === li.firstElementChild.textContent) {
                    options[i].setAttribute('selected', 'selected');
                    options[i].parentNode.dispatchEvent(new Event('change'));
                    selectedOption.push(options[i]);
                }
            }
            toggleClass(li);
        };

        var toggleClass = function(element) {
            var activeElement = element.parentNode.querySelector('.active');
            if (activeElement !== element) {
                activeElement.className = '';
                element.className = element.className == 'active' ? '' : 'active';
                if (selectedOption.length > 1) {
                    selectedOption.shift().removeAttribute('selected');
                }
            }
        };

        //our only public fn
        this.init = function () {
            populateLists();
            setUpEvents();

            //optionals
            if (callback) {
                callback();
            }
            if (triggerOpt) {
                var opt = productWrapper.querySelectorAll('option')[triggerOpt];
                    opt.setAttribute('selected', 'selected');
            }

        }
    };

    scope.SelectWrapper = typeof scope.SelectWrapper === 'undefined' ? SelectWrapper : scope.SelectWrapper;
}(window));
