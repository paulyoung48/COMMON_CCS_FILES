;//###########################################################################
;//
;// FILE:  F2837xS_DBGIER.asm
;//
;// TITLE: Set the DBGIER register
;//
;// DESCRIPTION:
;//  
;//  Function to set the DBGIER register (for realtime emulation).
;//  Function Prototype: void SetDBGIER(Uint16)
;//  Usage: SetDBGIER(value);
;//  Input Parameters: Uint16 value = value to put in DBGIER register. 
;//  Return Value: none          
;//
;//###########################################################################
;// $TI Release: F2837xS Support Library v160 $ 
;// $Release Date: Mon Jun 15 14:14:46 CDT 2015 $ 
;// $Copyright: Copyright (C) 2014-2015 Texas Instruments Incorporated -
;//             http://www.ti.com/ ALL RIGHTS RESERVED $
;//###########################################################################	
		.global _SetDBGIER
		.text
		
_SetDBGIER:
		MOV 	*SP++,AL
		POP 	DBGIER
		LRETR
		
