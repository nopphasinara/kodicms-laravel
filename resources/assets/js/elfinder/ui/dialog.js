/**
 * @class  elFinder dialog
 *
 * @author Dmitry (dio) Levashov
 **/
$.fn.elfinderdialog = function (opts) {
	var dialog;

	if (typeof(opts) == 'string' && (dialog = this.closest('.ui-dialog')).length) {
		if (opts == 'open') {
			dialog.css('display') == 'none' && dialog.fadeIn(120, function () {
				dialog.trigger('open');
			});
		} else if (opts == 'close') {
			dialog.css('display') != 'none' && dialog.hide().trigger('close');
		} else if (opts == 'destroy') {
			dialog.hide().remove();
		} else if (opts == 'toTop') {
			dialog.trigger('totop');
		}
	}

	opts = $.extend({}, $.fn.elfinderdialog.defaults, opts);

	this.filter(':not(.ui-dialog-content)').each(function () {
		var self = $(this).addClass('ui-dialog-content panel-body'),
			parent = self.parent(),
			clactive = 'elfinder-dialog-active',
			cldialog = 'elfinder-dialog',
			clnotify = 'elfinder-dialog-notify',
			clhover = 'ui-state-hover',
			id = parseInt(Math.random() * 1000000),
			overlay = parent.children('.elfinder-overlay'),
			buttonset = $('<div />'),
			buttonpane = $('<div class="panel-footer"/>')
				.append(buttonset),

			dialog = $('<div class="ui-dialog panel ui-draggable std42-dialog ' + cldialog + ' ' + opts.cssClass + '"/>')
				.hide()
				.append(self)
				.appendTo(parent)
				.draggable({
					handle: '.panel-heading',
					containment: 'document'
				})
				.css({
					width: opts.width,
					height: opts.height,
					backgoundColor: '#fff',
					position: 'absolute'
				})
				.mousedown(function (e) {
					e.stopPropagation();

					$(document).mousedown();

					if (!dialog.is('.' + clactive)) {
						parent.find('.' + cldialog + ':visible').removeClass(clactive);
						dialog.addClass(clactive).zIndex(maxZIndex() + 1);
					}
				})
				.bind('open', function () {
					dialog.trigger('totop');
					typeof(opts.open) == 'function' && $.proxy(opts.open, self[0])();

					if (!dialog.is('.' + clnotify)) {

						parent.find('.' + cldialog + ':visible').not('.' + clnotify).each(function () {
							var d = $(this),
								top = parseInt(d.css('top')),
								left = parseInt(d.css('left')),
								_top = parseInt(dialog.css('top')),
								_left = parseInt(dialog.css('left'))
								;

							if (d[0] != dialog[0] && (top == _top || left == _left)) {
								dialog.css({
									top: (top + 10) + 'px',
									left: (left + 10) + 'px'
								});
							}
						});
					}
				})
				.bind('close', function () {
					var dialogs = parent.find('.elfinder-dialog:visible'),
						z = maxZIndex();

					$(this).data('modal') && overlay.elfinderoverlay('hide');

					// get focus to next dialog
					if (dialogs.length) {
						dialogs.each(function () {
							var d = $(this);
							if (d.zIndex() >= z) {
								d.trigger('totop');
								return false;
							}
						})
					} else {
						// return focus to parent
						setTimeout(function () {
							parent.mousedown().click();
						}, 10);

					}

					if (typeof(opts.close) == 'function') {
						$.proxy(opts.close, self[0])();
					} else if (opts.destroyOnClose) {
						dialog.hide().remove();
					}
				})
				.bind('totop', function () {
					$(this).mousedown().find('.btn:first').focus();
					$(this).data('modal') && overlay.elfinderoverlay('show');
					overlay.zIndex($(this).zIndex());
				})
				.data({modal: opts.modal}),
			maxZIndex = function () {
				var z = parent.zIndex() + 10;
				parent.find('.' + cldialog + ':visible').each(function () {
					var _z;
					if (this != dialog[0]) {
						_z = $(this).zIndex();
						if (_z > z) {
							z = _z;
						}
					}
				})
				return z;
			},
			top
			;

		if (!opts.position) {
			top = parseInt((parent.height() - dialog.outerHeight()) / 2 - 42);
			opts.position = {
				top: (top > 0 ? top : 0) + 'px',
				left: parseInt((parent.width() - dialog.outerWidth()) / 2) + 'px'
			}
		}

		dialog.css(opts.position);

		if (opts.closeOnEscape) {
			$(document).bind('keyup.' + id, function (e) {
				if (e.keyCode == $.ui.keyCode.ESCAPE && dialog.is('.' + clactive)) {
					self.elfinderdialog('close');
					$(document).unbind('keyup.' + id);
				}
			})
		}
		dialog.prepend(
			$('<div class="panel-heading">' + opts.title + '</div>')
				.append(
					$('<div class="panel-heading-controls" />').append(
						$('<button class="btn btn-default btn-xs"><i class="fa fa-times"/></button>')
							.on('click', function (e) {
								e.preventDefault();
								self.elfinderdialog('close');
							})
						)
				)

		);

		$.each(opts.buttons, function (name, cb) {
			var button = $('<button type="button" class="btn btn-default">' + name + '</button>')
				.click($.proxy(cb, self[0]))
				.keydown(function (e) {
					var next;

					if (e.keyCode == $.ui.keyCode.ENTER) {
						$(this).click();
					} else if (e.keyCode == $.ui.keyCode.TAB) {
						next = $(this).next('.btn');
						next.length ? next.focus() : $(this).parent().children('.btn:first').focus()
					}
				})
			buttonset.append(button);
		})

		buttonset.children().length && dialog.append(buttonpane);
		if (opts.resizable && $.fn.resizable) {
			dialog.resizable({
				minWidth: opts.minWidth,
				minHeight: opts.minHeight,
				alsoResize: this,
				stop: function (event, ui) {
					$(this).trigger('resize', [ui]);
				}
			});
		}

		typeof(opts.create) == 'function' && $.proxy(opts.create, this)();

		opts.autoOpen && self.elfinderdialog('open');

	});

	return this;
}

$.fn.elfinderdialog.defaults = {
	cssClass: '',
	title: '',
	modal: true,
	resizable: true,
	autoOpen: true,
	closeOnEscape: true,
	destroyOnClose: false,
	buttons: {},
	position: null,
	width: 320,
	height: 'auto',
	minWidth: 200,
	minHeight: 110
}