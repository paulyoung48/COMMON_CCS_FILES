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
 *  ======== ProductView.xs ========
 */

/*
 *  ======== module$meta$init ========
 *  Initialize all product element descriptors
 *
 *  We initialize them here so we don't need to re-compile the ProductView
 *  specification everytime we make a change.
 */
function module$meta$init()
{
    /* System Group Modules */
    this.Home.elemName = "Home";
    this.Home.moduleName = "devkits.Home";
    this.Home.iconFileName = "icons/mem.ico";

    /* product */
    this.homeProduct.elemName = "PowerSuite";
    this.homeProduct.moduleName = null;
    this.homeProduct.iconFileName = "icons/mem.ico";
    this.homeProduct.elemArray = [
        this.Home
    ];
}

/*
 *  ======== getProductDescriptor ========
 */
function getProductDescriptor()
{
    return (this.homeProduct);
}

