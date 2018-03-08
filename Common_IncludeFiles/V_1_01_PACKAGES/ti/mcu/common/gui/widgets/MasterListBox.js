
require([
	"dojo/_base/declare",
	"gc/dijit/ListBox"], function(declare, listbox)
{
	grace.MasterListBox = declare(listbox, 
	{
		updateAttrs: function()
		{
			try
			{
				if (this.options.length > 0)
				{
					for(var sel = this.options.length; sel-- > 0; )
					{
						if (this.options[sel].selected)
						{
							break;
						}
					}
					
					if (sel == -1)  // no selection, read default value from cookie
					{
						var cookie = grace.cookies.get(this.id + 'ListboxIndex');
						this.savedSelection = cookie == '' ? 0 : Number(cookie);
						if (this.savedSelection >= 0 && this.savedSelection < this.options.length)
						{
							this.options[this.savedSelection].selected = true;
							this.options[this.savedSelection].clicked = true;
						}
					}
					else if (sel != this.savedSelection) 
					{
						// new selection, store value in cookie for 2 day.
						grace.cookies.set(this.id + 'ListboxIndex', String(sel), 2);
						this.savedSelection = sel;
					}
				}
			}
			catch(err)
			{
			}
			listbox.prototype.updateAttrs.call(this);
		}
	});
});

