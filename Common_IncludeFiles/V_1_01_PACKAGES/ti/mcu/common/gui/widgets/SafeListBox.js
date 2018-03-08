define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",
	"gc/dijit/libs/tools",
	"gc/dijit/ListBox"], function(declare, lang, array, tools, ListBox)
{
	return declare("gc.dijit.SafeListBox", [ListBox],  
	{
		userRequest : false,
		desiredIndex : -1,

		_setIndexAttr : function(index)
		{
			if (index >= 0)
			{
				this.log('model setting desiredIndex on listbox:' + this.id + ' = ' + index, 'SafeListBox');	
				this.desiredIndex = index;
			}
			ListBox.prototype._setIndexAttr.call(this, index);
		},
		
		updateAttrs : function() 
		{
			// when data changed or selected changed, we need run this to update all other attrs
			var i0=-1;
			var v0=null;
			var b0=0;
			array.forEach(this.options,function(op,i)
				{
					if(op.selected)
					{
						if(i0==-1)
						{
							i0=i;
							v0=op.value;
						};
						var nv=parseInt(op.value);
						if(!isNaN(nv))
							b0+=nv;
					};
				});

			if (i0 < 0)  // no selection, use desired value if there is one
			{
				i0 = this.desiredIndex;
				if (i0 >= 0 && i0 < this.options.length)
				{
					this.options[i0].selected = true;
					this.options[i0].clicked = true;
				}
			}
			else if (this.userRequest)
			{
				// update desired index when user makes a change.
				this.desiredIndex = i0;
			}
				
			if (i0 >= 0)
			{
				// prevent -1 index values from being written back to the model.
				this._set("index",i0);
			}
			this._set("value",v0);
			this._set("selectedBits",b0);
		},
		
		onAfterAddOptionItem: function(item, option)
		{
			item._changeBoxSuper = item._changeBox;
			item._changeBox = function()
				{
					try
					{
						this.parent.userRequest = true;
						this._changeBoxSuper();
					}
					finally
					{	
						this.parent.userRequest = false;
					}
				};
			if (option.index == this.desiredIndex)
			{
				option.selected = true;
				option.clicked = true;
			}
		}
		
	});
});

