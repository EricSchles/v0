App.BookController = Ember.ObjectController.extend({
  sourcePhrase:"",
  targetPhrase:"",
  actions: {
    favorite: function() {
      this.toggleProperty('favorite')
    },
    editability: function() {
      $(this).toggleClass('toggled'),
      this.toggleProperty('editing')
    },
    privacy: function() {
      $(this).toggleClass('toggled'),
      this.toggleProperty('privacy')
    },
    moreInfo: function() {
      $(".icon.more").toggleClass("close")
      $(".moreInfo").toggleClass("open")
    },
     addPhrase: function() {
      $(".newPhrase").show().toggleClass("open")
      $(".entry.entering").css("display","inline-block")
      var a = $(".book").scrollTop()
      $(".book").scrollTop(a+100)
    },
    saveSource: function() {
      var sourceInput=$(".newPhrase .input.source").val()
      if($(".newPhrase .input.source").val()!="") {
        $(".entry.entering").before("<li class='entry new'><ul><li class='source'><p>"+sourceInput+"</p></li></ul></li>")
        $(".entry.entering ul li.source").hide()
        $(".entry.entering ul li.target").show()
        $(".newPhrase .input.source").hide()
        $(".newPhrase .input.target").show()
        $(".newPhrase .saveSource").hide()
        $(".newPhrase .saveTarget").show()
        $(".newPhrase .input.source").val("")

        var sourcePhrase = this.store.createRecord('phrase',{
          sourcePhrase: this.get('sourcePhrase'),
          book: this.get('model'),
          createdAt: new Date()
        })
        var controller = this;
        sourcePhrase.save().then(function(sourcePhrase) {
          controller.set("sourcePhrase","");
          controller.get("model.phrases").addObject(sourcePhrase)
        })
      }
      var a = $(".book").scrollTop()
      $(".book").scrollTop(a+100)
    },
    saveTarget: function() {
      var targetInput=$(".newPhrase .input.target").val()
      if($(".newPhrase .input.target").val()!="") {
        $(".entry.new ul").append("<li class='target'><p>"+targetInput+"</p></li>")
        $(".entry.entering ul li.source").show()
        $(".entry.entering ul li.target").hide()
        $(".newPhrase .input.source").show()
        $(".newPhrase .input.target").hide()
        $(".newPhrase .saveSource").show()
        $(".newPhrase .saveTarget").hide()
        $(".newPhrase .input.target").val("")
        $(".entry.new").removeClass("new")
        $(".newPhrase").toggleClass("open")
        $(".entry.entering").hide()


      }
      console.log("1 "+a)
      var a = $(".book").scrollTop()
      $(".book").scrollTop(a+100)
      a=$(".book").scrollTop()
      console.log("2 "+a)
    }
  }
})
