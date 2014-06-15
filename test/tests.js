QUnit.test("#html", function(assert) {
  var td_el = new ThinDOM("span");
  td_el.html("some text here");
  assert.ok(td_el.html() == "some text here", "Successfully set inner html");
  assert.ok(td_el.el.innerHTML == "some text here", "Successfully set inner html");
  td_el.html("");
  assert.ok(td_el.html() == "", "Successfully cleared innert html");
  assert.ok(td_el.el.innerHTML == "", "Successfully cleared innert html");
});

QUnit.test('#css', function(assert) {
  var td_el = new ThinDOM('span');
  td_el.css('display', 'none');
  assert.ok(td_el.el.style['display'] == 'none', 'Successfully set individual style');
  td_el.css({ display: '', color: 'red', width: 'auto' });
  assert.ok(td_el.el.style['display'] == 'none' && // does not unset empty values
            td_el.el.style['color'] == 'red' &&
            td_el.el.style['width'] == 'auto', 'Successfully set bulk styles');
});
