const { translate } = require('free-translate')
// import { translate } from 'free-translate';
 

translate(`some english text here`, { from: 'auto', to: 'ko' }).then(n => {
	  console.log(n) // Hello World
})

var lang = ['en','pt','af','sq','am','ar','hy','az','eu','be','bn','bs','bg','ca','ceb','ny','zh-CN','co','hr','cs','da','nl','eo','et','tl','fi','fr','fy','gl','ka','de','el','gu','ht','ha','haw','iw','hi','hmn','hu','is','ig','id','ga','it','ja','jw','kn','kk','km','rw','ko','ku','ky','lo','la','lv','lt','lb','mk','mg','ms','ml','mt','mi','mr','mn','my','ne','no','or','ps','fa','pl','pa','ro','ru','sm','gd','sr','st','sn','sd','si','sk','sl','so','es','su','sw','sv','tg','ta','tt','te','th','tr','tk','uk','ur','ug','uz','vi','cy','xh','yi','yo','zu','zh-TW']

var result = []
names.forEach(function(item) {
     if(result.indexOf(item) < 0) {
         result.push(item)
     }
})

console.log(result.toString())