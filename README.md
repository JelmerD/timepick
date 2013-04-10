Timepick
========
**A lightweight jQuery Plugin to select times easily and quick**

Usage
-----

**Default**

    $('#time').timepick();

**Alternate Field**

    $('#time').timepick({
        altField: $('#alt-time-2')
    });

**On Change Callback**

    $('#time').timepick({
        onChange: function (value) {
            alert('Your selected time is ' + value[0] + ' minutes and ' + value[1] + ' seconds');
        }
    });

**Hours/Minutes Ranges**

    $('#time').timepick({
        hours: [10,22],
        minutes: [50,53]
    });

License
-------
Copyright (c) 2013 Jelmer Dröge

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
