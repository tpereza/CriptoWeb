(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a3d427e4"],{"3f65":function(e,i,n){},ab00:function(e,i){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"getMultimediaByUser"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"id"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"getMultimediaByUser"},arguments:[{kind:"Argument",name:{kind:"Name",value:"id"},value:{kind:"Variable",name:{kind:"Name",value:"id"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"descripcion"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"formato"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tamano"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"id_bucket"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"usuario_creador_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"etiquetas_relacionadas_ids"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tableros_agregados_ids"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]}]}}]}}],loc:{start:0,end:258}};n.loc.source={body:"query getMultimediaByUser($id: String!){\n  getMultimediaByUser(id: $id){\n    id\n    descripcion\n    url\n    formato\n    tamano\n    id_bucket\n    usuario_creador_id\n    etiquetas_relacionadas_ids\n    tableros_agregados_ids\n    created_at\n    updated_at\n  }\n}\n",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,i){if("FragmentSpread"===e.kind)i.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,i)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,i)})),e.definitions&&e.definitions.forEach((function(e){t(e,i)}))}var a={};function r(e,i){for(var n=0;n<e.definitions.length;n++){var t=e.definitions[n];if(t.name&&t.name.value==i)return t}}function d(e,i){var n={kind:e.kind,definitions:[r(e,i)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var t=a[i]||new Set,d=new Set,o=new Set;t.forEach((function(e){o.add(e)}));while(o.size>0){var s=o;o=new Set,s.forEach((function(e){if(!d.has(e)){d.add(e);var i=a[e]||new Set;i.forEach((function(e){o.add(e)}))}}))}return d.forEach((function(i){var t=r(e,i);t&&n.definitions.push(t)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var i=new Set;t(e,i),a[e.name.value]=i}}))})(),e.exports=n,e.exports["getMultimediaByUser"]=d(n,"getMultimediaByUser")},c44c:function(e,i,n){"use strict";var t=n("3f65"),a=n.n(t);a.a},d92d:function(e,i,n){"use strict";n.r(i);var t=function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{staticClass:"tabmenudemo-content"},[n("MultimediaByUser",{key:e.componentKey,attrs:{id:Number(e.$route.params.id),isOther:e.isOther},on:{updated:e.forceRerender}})],1)},a=[],r=function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("div",{attrs:{id:"multimediabyuser"}},[n("div",{staticClass:"container"},[n("stack",{attrs:{"column-min-width":200,"gutter-width":5,"gutter-height":5,"monitor-images-loaded":""}},e._l(e.images,(function(i,t){return n("stack-item",{key:t,staticStyle:{transition:"transform 300ms"}},[n("img",{staticClass:"feed",attrs:{src:i.url,alt:i.descripcion}}),n("b-card",{staticClass:"text-center",attrs:{title:i.descripcion},scopedSlots:e._u([{key:"footer",fn:function(){return[e.isOther?e._e():n("DeleteMultimedia",{attrs:{image:i},on:{saved:e.onDelete}}),e.isOther?e._e():n("b-button",{attrs:{variant:"info"}},[n("b-icon",{attrs:{icon:"pencil-square","aria-hidden":"true"}})],1),n("b-button",{attrs:{variant:"warning"}},[n("b-icon",{attrs:{icon:"bookmark-fill","aria-hidden":"true"}})],1)]},proxy:!0}],null,!0)},[n("div",{staticClass:"tags"},e._l(i.etiquetas_relacionadas_ids,(function(i){return n("div",{key:i},[n("span",{staticClass:"tag is-info is-light is-rounded"},[e._v(" "+e._s(i)+" ")])])})),0)])],1)})),1)],1)])},d=[],o=(n("a9e3"),n("96cf"),n("1da1")),s=n("5530"),u=n("a341"),l=n("2f62"),c=function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("b-button",{attrs:{variant:"danger"},on:{click:e.mutateNow}},[n("b-icon",{attrs:{icon:"trash-fill","aria-hidden":"true"}})],1)},m=[],f={name:"DeleteMultimedia",props:{image:{type:Object,required:!0}},methods:{onCancel:function(){this.$emit("cancelled","someValue")},mutateNow:function(){var e=this;this.$apollo.mutate({mutation:n("fd74"),variables:{idMultimedia:this.image.id},context:{headers:{Authorization:this.token}}}).then((function(i){e.$emit("saved",i.data.deleteMultimedia)}))}},computed:Object(s["a"])({},Object(l["c"])({token:function(e){return e.token}}))},v=f,k=n("2877"),p=Object(k["a"])(v,c,m,!1,null,null,null),h=p.exports,b=n("ab00"),g=n.n(b),y={name:"multimediabyuser",components:{Stack:u["a"],StackItem:u["b"],DeleteMultimedia:h},props:{labels:[],id:{type:Number,required:!0},isOther:{type:Boolean}},data:function(){return{images:[]}},methods:{onDelete:function(e){this.$toast.add({severity:"success",summary:e,life:3e3}),this.$emit("updated")}},computed:Object(s["a"])({},Object(l["c"])({token:function(e){return e.token}})),created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function i(){var n,t,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n=String(e.id),t=e.token,i.next=4,e.$apollo.query({fetchPolicy:"no-cache",query:g.a,variables:{id:n},context:{headers:{Authorization:t}}});case 4:a=i.sent,e.images=a.data.getMultimediaByUser;case 6:case"end":return i.stop()}}),i)})))()}},S=y,N=(n("c44c"),Object(k["a"])(S,r,d,!1,null,null,null)),_=N.exports,w={components:{MultimediaByUser:_},props:{isOther:{type:Boolean}},data:function(){return{componentKey:0}},methods:{forceRerender:function(){this.componentKey+=1}}},M=w,O=Object(k["a"])(M,t,a,!1,null,null,null);i["default"]=O.exports},fd74:function(e,i){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"deleteMultimedia"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"idMultimedia"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"deleteMultimedia"},arguments:[{kind:"Argument",name:{kind:"Name",value:"idMultimedia"},value:{kind:"Variable",name:{kind:"Name",value:"idMultimedia"}}}],directives:[]}]}}],loc:{start:0,end:105}};n.loc.source={body:"mutation deleteMultimedia  ($idMultimedia: String!) {\n    deleteMultimedia (idMultimedia:$idMultimedia)\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};function t(e,i){if("FragmentSpread"===e.kind)i.add(e.name.value);else if("VariableDefinition"===e.kind){var n=e.type;"NamedType"===n.kind&&i.add(n.name.value)}e.selectionSet&&e.selectionSet.selections.forEach((function(e){t(e,i)})),e.variableDefinitions&&e.variableDefinitions.forEach((function(e){t(e,i)})),e.definitions&&e.definitions.forEach((function(e){t(e,i)}))}var a={};function r(e,i){for(var n=0;n<e.definitions.length;n++){var t=e.definitions[n];if(t.name&&t.name.value==i)return t}}function d(e,i){var n={kind:e.kind,definitions:[r(e,i)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var t=a[i]||new Set,d=new Set,o=new Set;t.forEach((function(e){o.add(e)}));while(o.size>0){var s=o;o=new Set,s.forEach((function(e){if(!d.has(e)){d.add(e);var i=a[e]||new Set;i.forEach((function(e){o.add(e)}))}}))}return d.forEach((function(i){var t=r(e,i);t&&n.definitions.push(t)})),n}(function(){n.definitions.forEach((function(e){if(e.name){var i=new Set;t(e,i),a[e.name.value]=i}}))})(),e.exports=n,e.exports["deleteMultimedia"]=d(n,"deleteMultimedia")}}]);
//# sourceMappingURL=chunk-a3d427e4.dda4b6d5.js.map