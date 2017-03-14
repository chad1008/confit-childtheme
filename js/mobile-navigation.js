( function( $ ) {

	$( document ).ready( function() {

		/* Original Menu JavaScript */

		var $masthead = $( '#masthead' ),
	    timeout = false;

		$.fn.smallMenu = function() {
			$masthead.find( '.site-navigation' ).removeClass( 'main-navigation' ).addClass( 'main-small-navigation' );
			$masthead.find( '.site-navigation h1' ).removeClass( 'assistive-text' ).addClass( 'menu-toggle' );

			$( '.menu-toggle' ).unbind( 'click' ).click( function() {
				$masthead.find( '.menu' ).toggle();
				$( this ).toggleClass( 'toggled-on' );
			} );
		};

		// Check viewport width on first load.
		if ( $( window ).width() < 769 )
			$.fn.smallMenu();

		// Check viewport width when user resizes the browser window.
		$( window ).resize( function() {
			var browserWidth = $( window ).width();

			if ( false !== timeout )
				clearTimeout( timeout );

			timeout = setTimeout( function() {
				if ( browserWidth < 769 ) {
					$.fn.smallMenu();
				} else {
					$masthead.find( '.site-navigation' ).removeClass( 'main-small-navigation' ).addClass( 'main-navigation' );
					$masthead.find( '.site-navigation h1' ).removeClass( 'menu-toggle' ).addClass( 'assistive-text' );
					$masthead.find( '.menu' ).removeAttr( 'style' );
				}
			}, 200 );
		} );

		var container = $( '.site-navigation' );

		// Fix child menus for touch devices.
		function fixMenuTouchTaps( container ) {
			var touchStartFn,
			    parentLink = container.find( '.menu-item-has-children > a, .page_item_has_children > a' );

			if ( 'ontouchstart' in window ) {
				touchStartFn = function( e ) {
					var menuItem = this.parentNode;

					if ( ! menuItem.classList.contains( 'focus' ) ) {
						e.preventDefault();
						for( var i = 0; i < menuItem.parentNode.children.length; ++i ) {
							if ( menuItem === menuItem.parentNode.children[i] ) {
								continue;
							}
							menuItem.parentNode.children[i].classList.remove( 'focus' );
						}
						menuItem.classList.add( 'focus' );
					} else {
						menuItem.classList.remove( 'focus' );
					}
				};

				for ( var i = 0; i < parentLink.length; ++i ) {
					parentLink[i].addEventListener( 'touchstart', touchStartFn, false )
				}
			}
		}

		fixMenuTouchTaps( container );


		/* New JavaScript added to toggle submenus on mobile */

		var container = $( '.main-small-navigation:first' );

		function initMainNavigation( container ) {

			// Add dropdown toggle that displays child menu items.
			var dropdownToggle = $( '<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false }).append( $( '<span />', { 'class': 'screen-reader-text', text: confitChildScreenReaderText.expand }) );

			$( container ).find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );

			// Set the active submenu dropdown toggle button initial state.
			$( container ).find( '.current-menu-ancestor > button' )
				.addClass( 'toggled-on' )
				.attr( 'aria-expanded', 'true' )
				.find( '.screen-reader-text' )
				.text( confitChildScreenReaderText.collapse );

			// Set the active submenu initial state.
			$( container ).find( '.current-menu-ancestor > .sub-menu, .current-menu-ancestor > .children' ).addClass( 'toggled-on' );

			$( container ).find( '.dropdown-toggle' ).click( function( e ) {
				var _this = $( this ),
				screenReaderSpan = _this.find( '.screen-reader-text' );

				e.preventDefault();
				_this.toggleClass( 'toggled-on' );
				_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

				_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

				screenReaderSpan.text( screenReaderSpan.text() === confitChildScreenReaderText.expand ? confitChildScreenReaderText.collapse : confitChildScreenReaderText.expand );
			});
		}
		initMainNavigation( container );

	} );
} )( jQuery );