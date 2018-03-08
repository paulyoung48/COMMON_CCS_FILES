define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"gc/dijit/libs/tools",
	"gc/dijit/libs/_selectableWidget",
	"gc/dijit/Select"], function(declare, lang, array, tools, _selectableWidget, Select)
{
	return declare("gc.dijit.SafeDropList", [Select],  
	{
		internalRequest : false,
		desiredIndex : -1,
		
		_set : function(property, value)
		{
			if (property == 'index')
			{
				if (this.internalRequest)
				{
					return;
				}
				this.desiredIndex = value;
			}
				
			Select.prototype._set.call(this, property, value);
		},
		
		_setIndexAttr : function(index)
		{
			this.desiredIndex = index;
			Select.prototype._setIndexAttr.call(this, index);
		},
		
		_getValueFromOpts : function()
		{
			// preserve desired index value for internal requests, otherwise allow value to be changed by user or model.
			if (this.internalRequest && this.desiredIndex >= 0 && this.options && this.desiredIndex < this.options.length)
			{
				for(var i = this.options.length; i-- > 0; )
				{
					if (this.options[i].index == this.desiredIndex)
					{
						return this.options[i].value;
					}
				}
			}
			return Select.prototype._getValueFromOpts.call(this);
		},
		
		_loadChildren : function(flag)
		{
			this.internalRequest = true;
			try
			{
				Select.prototype._loadChildren.call(this, flag);
			}
			finally
			{
				this.internalRequest = false;
			}
		}
		
	});
});

