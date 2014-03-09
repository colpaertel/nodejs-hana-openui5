/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.ListBaseRenderer");jQuery.sap.declare("sap.m.TableRenderer");sap.m.TableRenderer=sap.ui.core.Renderer.extend(sap.m.ListBaseRenderer);
sap.m.TableRenderer.renderColumns=function(r,t,a){var i=0,h=0,b=false,c=false,m=t.getMode(),d="sapMListTbl",e=t.getId("tbl"),f=(a=="Head")?"th":"td",g="t"+a.toLowerCase(),C=t.getColumns(),j=(a=="Head")&&C.every(function(o){return!o.getHeader()||!o.getVisible()||o.isPopin()||o.isNeverVisible()||o.isHidden()}),k=(a=="Head")&&C.filter(function(o){return o.getVisible()&&!o.isPopin()&&!o.isNeverVisible()&&!o.isHidden()}).length==1,l=(sap.ui.core.theming.Parameters.get("sapMPlatformDependent")!="true"&&m=="Delete"),n=function(o,p){r.write("<");r.write(f);p&&r.writeAttribute("id",e+p);r.addClass(d+o);r.writeClasses();r.write("></");r.write(f);r.write(">");i++};r.write("<"+g+">");r.write("<tr");r.writeAttribute("tabindex",-1);r.writeAttribute("id",t.addNavSection(e+a+"er"));if(j){r.addClass("sapMListTblHeaderNone")}else{r.addClass("sapMListTblRow sapMListTbl"+a+"er")}r.writeClasses();r.write(">");if(m!="None"&&m!="SingleSelect"&&!l){if(m=="SingleSelectMaster"){n("None");h++}else if(m=="MultiSelect"&&a=="Head"&&!j){r.write("<th class='"+d+"SelCol'><div class='sapMLIBSelectM'>");r.renderControl(t._getSelectAllCheckbox());r.write("</div></th>");i++}else{n("SelCol")}}if(sap.ui.core.theming.Parameters.get("sapUiLIUnreadAsBubble")=="true"&&t.getShowUnread()){n("UnreadCol")}C.forEach(function(o,p){o.setIndex(-1);o.setInitialOrder(p)});t.getColumns(true).forEach(function(o,p){if(!o.getVisible()){return}if(o.isPopin()){b=true;return}if(o.isNeverVisible()){return}if(o.isHidden()){h++}var q=o["get"+a+"er"](),w=k?"":o.getWidth(),s=o.getStyleClass(true);r.write("<"+f);s&&r.addClass(s);r.addClass(d+"Cell");r.writeAttribute("id",e+a+i);r.writeAttribute("data-sap-orig-width",o.getWidth());w&&r.addStyle("width",w);r.addStyle("text-align",o.getCssAlign());r.writeClasses();r.writeStyles();r.write(">");if(q){o.applyAlignTo(q);r.renderControl(q)}if(a=="Head"&&!c){c=!!o.getFooter()}r.write("</"+f+">");o.setIndex(i++)});n("NavCol",a+"Nav");if(m=="SingleSelect"||l){n("SelCol")}r.write("</tr></"+g+">");if(a=="Head"){t._hasPopin=b;t._colCount=i-h;t._hasFooter=c;t._headerHidden=j}};
sap.m.TableRenderer.renderContainerAttributes=function(r,c){c._bRendering=true;r.addClass("sapMListTblCnt")};
sap.m.TableRenderer.renderListStartAttributes=function(r,c){r.write("<table");r.addClass("sapMListTbl")};
sap.m.TableRenderer.renderListHeadAttributes=function(r,c){this.renderColumns(r,c,"Head");r.write("<tbody");r.writeAttribute("id",c.getId("tblBody"));r.write(">")};
sap.m.TableRenderer.renderListEndAttributes=function(r,c){r.write("</tbody>");c._hasFooter&&this.renderColumns(r,c,"Foot");c._bRendering=false;r.write("</table>")};
sap.m.TableRenderer.renderNoData=function(r,c){r.write("<tr");r.writeAttribute("id",c.getId("nodata"));r.addClass("sapMLIB sapMListTblRow");if(!c._headerHidden||(!c.getHeaderText()&&!c.getHeaderToolbar())){r.addClass("sapMLIBShowSeparator")}r.writeClasses();r.write("><td");r.writeAttribute("id",c.getId("nodata-text"));r.writeAttribute("colspan",c.getColCount());r.addClass("sapMListTblCell sapMListTblCellNoData");r.writeClasses();r.write(">");r.writeEscaped(c.getNoDataText());r.write("</td></tr>")};
sap.m.TableRenderer.shouldRenderItems=function(c){return c.getColumns().some(function(C){return C.getVisible()})};