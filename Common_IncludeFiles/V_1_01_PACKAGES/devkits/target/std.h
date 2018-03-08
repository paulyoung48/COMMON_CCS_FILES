/* --COPYRIGHT--,ESD
 *  Copyright (c) 2008 Texas Instruments. All rights reserved. 
 *  This program and the accompanying materials are made available under the 
 *  terms of the Eclipse Public License v1.0 and Eclipse Distribution License
 *  v. 1.0 which accompanies this distribution. The Eclipse Public License is
 *  available at http://www.eclipse.org/legal/epl-v10.html and the Eclipse
 *  Distribution License is available at 
 *  http://www.eclipse.org/org/documents/edl-v10.php.
 *
 *  Contributors:
 *      Texas Instruments - initial implementation
 * --/COPYRIGHT--*/

/*
 *  ======== devkits/target/std.h ========
 *  Standard types for supported TI compilers
 */

#ifndef devkits_target_STD_
#define devkits_target_STD_

/*  Define target-specific "portable" macros
 *
 *  The build command-line define xdc_target_name__ to be the value
 *  of the target's name config parameter.  We use this to include the
 *  target-specific definitions for the required target-independent
 *  xdc_target* macros.
 */
#if defined(xdc_target_name__) && !defined(xdc_target_macros_include__)
#include xdc__local_include(xdc_target_name__)
#endif

/* "inherit" (i.e., include) all ti.targets standard types */
#include <ti/targets/std.h>

#endif

#endif /* devkits_target_STD_ */
