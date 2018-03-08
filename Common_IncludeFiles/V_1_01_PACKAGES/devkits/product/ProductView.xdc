/* --COPYRIGHT--,EPL
 *  Copyright (c) 2008 Texas Instruments and others.
 *  All rights reserved. This program and the accompanying materials
 *  are made available under the terms of the Eclipse Public License v1.0
 *  which accompanies this distribution, and is available at
 *  http://www.eclipse.org/legal/epl-v10.html
 * 
 *  Contributors:
 *      Texas Instruments - initial implementation
 * 
 * --/COPYRIGHT--*/

/*
 *  ======== ProductView.xdc ========
 */

/*!
 *  ======== ProductView ========
 *  Define the product view of the PowerSuite product
 *  @_nodoc
 */
metaonly module ProductView inherits xdc.tools.product.IProductView
{
    /*
     *  ======== homeModule ========
     *  Specify the home module for this product
     */
    override config String homeModule = "devkits.Home";

    /*
     *  ======== linksToArray ========
     *  Specify other products that are "linked to" from this product
     *
     *  Product named here will have their home button redirected to
     *  the home module of this product.
     */
    override config String linksToArray[] = [
        "org.eclipse.rtsc.xdctools"
    ];

    /* System modules */
    config ProductElemDesc Home;

    /* groups */
    config ProductElemDesc peripheralsGroup;

    /* product */
    config ProductElemDesc homeProduct;
}
