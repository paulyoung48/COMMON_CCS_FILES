## define the top repository (if it is not already defined)
TOP ?= .

## put ^ at front of XDCPATH because some packages are also in XDCtools
XDCPATH = ^;^/../imports;$(TOOLS)/packages
MYBUNDLE_XDCPATH = ^/..;^/../imports;$(TOOLS)/packages

## shortcut xdc command
MYXDC = "$(XDCROOT)/xdc" XDCPATH="$(XDCPATH)"
MYBUNDLE = "$(XDCROOT)/xdc" XDCPATH="$(MYBUNDLE_XDCPATH)"

## find all packages
ALLPKGS     := $(shell "$(XDCROOT)/bin/xdcpkg" -r $(TOP))

all: interfaces archives

interfaces:
	$(MYXDC) --jobs=4 .interfaces -P $(ALLPKGS)

archives:
	$(MYXDC) release -P $(ALLPKGS)

clean:
	-$(MYXDC) clean --jobs=4 -Pr $(TOP) ./bundles

%:
	@echo building $@ ...
	$(MYXDC) $@ -Pr $(TOP)
	$(MYBUNDLE) release -Pr ./bundles
    












