<?php
/**
 * Confit child theme functions and definitions
 *
 * @package Confit Child Theme
 * @since Confit Child Theme 1.0
 */

function confit_child_enqueue_styles() {

    $parent_style = 'confit-style';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );

    $confitChild_l10n = array(
 		'expand'   => esc_html__( 'Expand child menu', 'confit-child' ),
 		'collapse' => esc_html__( 'Collapse child menu', 'confit-child' )
 	);
 	/* Enqueue new menu script */
    wp_enqueue_script( 'confit-mobile-navigation', get_stylesheet_directory_uri() . '/js/mobile-navigation.js', array( 'jquery' ), '20170310' );
    wp_localize_script( 'confit-mobile-navigation', 'confitChildScreenReaderText', $confitChild_l10n );

    /**
     * Dequeue original menu script - it's JS has been moved into the new file
     * For some reason, having them separate caused the new one not to work.*/
    wp_dequeue_script( 'small-menu', get_template_directory_uri() . '/js/small-menu.js', array( 'jquery' ), '20120926', true );

    /* It's a bit of overkill, but enqueue Genericons for arrows */
    wp_enqueue_style( 'genericons', get_stylesheet_directory_uri() . '/genericons/genericons.css', array(), '3.4.1' );
}
add_action( 'wp_enqueue_scripts', 'confit_child_enqueue_styles' );