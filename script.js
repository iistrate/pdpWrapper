(function(scope){
    var SelectWrapper = function (selector, style, callback, grabAttributes, triggerOpt, skipFirst) {
        //grab our config swatches wrapper
        var productWrapper = document.querySelector(selector),
            selects        = productWrapper.querySelectorAll('select'),
            selectedOption = [],
            type           = style || 'regular',
            callback       = callback || null,
            grabAttributes = grabAttributes || false,
            triggerOpt     = triggerOpt || false,
            skipFirstOpt   = skipFirst || false;

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
                var options        = select.querySelectorAll('option' + (skipFirstOpt ? ':not(:first-child)' : '')),
                    selectedIndex  = select.selectedIndex;
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
                    if (index===selectedIndex) {
                        li[index].className = li[index].className+' active';
                    }
                    if (index === options.length-1 && style === 'dropdown') {
                        li[selectedIndex].parentNode.insertBefore(li[selectedIndex], li[0]);
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
            productWrapper.addEventListener('click', function(e) {
                var target = e.target;
                if (target.tagName === 'SPAN' || target.tagName === 'LI') {
                    triggerSelect(e);
                }
            }, false);
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
                activeElement.classList.remove('active');
                element.classList.toggle('active');
                if (selectedOption.length > 1) {
                    selectedOption.shift().removeAttribute('selected');
                }
            }
        };

        return {
            init: function() {
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
    };

    scope.SelectWrapper = typeof scope.SelectWrapper === 'undefined' ? SelectWrapper : scope.SelectWrapper;
}(window));
