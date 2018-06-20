const Discord = require('discord.js')
const bot = new Discord.Client()
const translate = require('google-translate-api')
const config = require ('./config')
const wd = require('word-definition')

let translator = {
    traduction: function(msg, clean) {
        translate(clean.slice(3, clean.length).join(' '), {to: clean[2]})
            .then(function(res) {
		msg.delete();
                if (res.text)
		              msg.reply(res.text)
            })
        // msg.reply('traduction')
    },
    dictionnary: function(msg, clean) {
        wd.getDef(clean[2], "en", null, function(res) {
                msg.delete();
                if (res.definition)
                        msg.reply(res.definition)
        })
    },
    error: function(msg) {
	    msg.delete()
        msg.author.sendMessage('Unknow command. try -h for help.')
    },
    printHelp: function(msg) {
	msg.delete()
	msg.author.sendMessage('How to use me:\n- !bt -t <language> <phrase> -> Translate a sentence to another language.\n- !bt -d <language> <word> -> Get the definition of a word into a specific language.\n- !bt -l -> List all disponible languages\n- !bt -h -> See this helping guide.')
    },
    language: function(msg) {
	    msg.delete()
	msg.author.sendMessage('Here is a list of all disponible languages:\n\nEurope:\nsq: Albanian,\neu: Basque,\nbe: Belarusian,\nbs: Bosnian,\nbg: Bulgarian,\nca: Catalan,\nco: Corsican,\nhr: Croatian,\ncs: Czech,\nda: Danish,\nnl: Dutch,\nen: English,\net: Estonian,\nfi: Finnish,\nfr: French,\nfy: Frisiahu: Hungarian,\nde: German,\nis: Icelandic,\nga: Irish,\nit: Italian,\nlv: Latvian,\nlt: Lithuanian,\nlb: Luxembourgish,\nmk: Macedonian,\nno: Norwegian,\npl: Polish,\npt: Portuguese,\nro: Romanian,\nru: Russian,\ngd: Scots Gaelic,\nsr: Serbian,\nsl: Slovenian,\nes: Spanish,\nsv: Swedish,\ntr: Turkish,\nuk: Ukrainian,\ncy: Welsh,\n\nAsia:\nhy: Armenian,\naz: Azerbaijani,\nbn: Bengali,\nceb: Cebuano,\nzh-cn: Chinese Simplified,\nzh-tw: Chinese Traditional,\nka: Georgian,\ngu: Gujarati,\nhi: Hindi,\nhmn: Hmong,\nid: Indonesian,\nja: Japanese,\njw: Javanese,\nkn: Kannada,\nkk: Kazakh,\nkm: Khmer,\nko: Korean,\nku: Kurdish (Kurmanji),\nky: Kyrgyz,\nlo: Lao,\nmg: Malagasy,\nms: Malay,\nml: Malayalam,\nmi: Maori,\nmr: Marathi,\nmn: Mongolian,\nmy: Myanmar (Burmese),\nne: Nepali,\nps: Pashto,\nfa: Persian,\nma: Punjabi,\nsd: Sindhi,\nsi: Sinhala,\nsk: Slovak,\ntg: Tajik,\nta: Tamil,\nte: Telugu,\nth: Thai,\nur: Urdu,\nuz: Uzbek,\nvi: Vietnamese,\nyi: Yiddish,\ngl: Galician,\niw: Hebrew,\nmt: Maltese,\nar: Arabic,\n\nAfrica:\naf: Afrikaans,\nam: Amharic,\nny: Chichewa,\nig: Igbo,\nst: Sesotho,\nsn: Shona,\nso: Somali,\nsu: Sundanese,\nsw: Swahili,\nxh: Xhosa,\nyo: Yoruba,\nzu: Zulu\n\nOthers:\nauto: Automatic\neo: Esperanto,\nel: Greek,\nla: Latin,\ntl: Filipino,\nht: Haitian Creole,\nhaw: Hawaiian,\nsm: Samoan,\n')
    }
}

bot.on('message', function(msg) {
    let content = msg.content
    if (msg.content.substr(0, msg.content.indexOf(' ')) == '!bt' || msg.content == '!bt') {
        let clean = msg.content.split(' ')
        switch (clean[1]) {
        case '-t':
            translator.traduction(msg, clean)
            break
        case '-d':
            translator.dictionnary(msg, clean)
            break
        case '-h':
            translator.printHelp(msg)
            break
	case '-l':
	    translator.language(msg)
	    break
        default:
            translator.error(msg)
        }
    }
})

bot.login(config.token)
