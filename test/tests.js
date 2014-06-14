QUnit.test("#html", function(assert) {
  var td_el = new ThinDOM("span");
  td_el.html("some text here");
  assert.ok(td_el.html() == "some text here", "Successfully set inner html");
  assert.ok(td_el.el.innerHTML == "some text here", "Successfully set inner html");
});
