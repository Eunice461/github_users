const client = require('../redis-connect')

async function httpRedisForArray(req, res){
    try {
        const notAllowedWords = "fuck idiot stupid bastard 2 girls 1 cup 2g1c 4r5e 5h1t 5hit a$$ a$$hole a_s_s a2m a54 a55 a55hole aeolus ahole alabama hot pocket alaskan pipeline anal anal impaler anal leakage analannie analprobe analsex anilingus anus apeshit ar5e areola areole arian arrse arse arsehole aryan ass ass fuck ass hole assault assbag assbagger assbandit assbang assbanged assbanger assbangs assbite assblaster assclown asscock asscracker asses assface assfaces assfuck assfucker ass-fucker assfukka assgoblin assh0le asshat ass-hat asshead assho1e asshole assholes asshopper asshore ass-jabber assjacker assjockey asskiss asskisser assklown asslick asslicker asslover assman assmaster assmonkey assmucus assmunch assmuncher assnigger asspacker asspirate ass-pirate asspuppies assranger assshit assshole asssucker asswad asswhole asswhore asswipe asswipes auto erotic autoerotic axwound azazel azz b!tch b00bs b17ch b1tch babe babeland babes baby batter baby juice badfuck ball gag ball gravy ball kicking ball licking ball sack ball sucking ballbag balllicker balls ballsack bampot bang bang (one's) box bangbros banger banging bareback barely legal barenaked barf barface barfface bastard bastardo bastards bastinado batty boy bawdy bazongas bazooms bbw bdsm beaner beaners beardedclam beastial beastiality beatch beater beatyourmeat beaver beaver cleaver beaver lips beef curtain beef curtains beer beeyotch bellend bender beotch bestial bestiality bi+ch biatch bicurious big black big breasts big knockers big tits bigbastard bigbutt bigger bigtits bimbo bimbos bint birdlock bisexual bi-sexual bitch bitch tit bitchass bitched bitcher bitchers bitches bitchez bitchin bitching bitchtits bitchy black cock blonde action blonde on blonde action bloodclaat bloody bloody hell blow blow job blow me blow mud blow your load blowjob blowjobs blue waffle blumpkin boang bod bodily bogan bohunk boink boiolas bollick bollock bollocks bollok bollox bomd bondage bone boned boner boners bong boob boobies boobs booby booger bookie boong boonga booobs boooobs booooobs booooooobs bootee bootie booty booty call booze boozer boozy bosom bosomy bowel bowels bra brassiere breast breastjob breastlover breastman breasts breeder brotherfucker brown showers brunette action buceta bugger buggered buggery bukkake bull shit bullcrap bulldike bulldyke bullet vibe bullshit bullshits bullshitted bullturds bum bum boy bumblefuck bumclat bumfuck bummer bung bung hole bunga bunghole bunny fucker bust a load busty butchdike butchdyke butt butt fuck butt plug buttbang butt-bang buttcheeks buttface buttfuck butt-fuck buttfucka buttfucker butt-fucker butthead butthole buttman buttmuch buttmunch buttmuncher butt-pirate buttplug c.0.c.k c.o.c.k. c.u.n.t c0ck c-0-c-k c0cksucker caca cahone camel toe cameltoe camgirl camslut camwhore carpet muncher carpetmuncher cawk cervix chesticle chi-chi man chick with a dick child-fucker chin chinc chincs chink chinky choad choade choc ice chocolate rosebuds chode chodes chota bags cipa circlejerk cl1t cleveland steamer climax clit clit licker clitface clitfuck clitoris clitorus clits clitty clitty litter clogwog clover clamps clunge clusterfuck cnut cocain cocaine cock c-o-c-k cock pocket cock snot cock sucker cockass cockbite cockblock cockburger cockeye cockface cockfucker cockhead cockholster cockjockey cockknocker cockknoker cocklicker cocklover cocklump cockmaster cockmongler cockmongruel cockmonkey cockmunch cockmuncher cocknose cocknugget cocks cockshit cocksmith cocksmoke cocksmoker cocksniffer cocksucer cocksuck cocksuck cocksucked cocksucker cock-sucker cocksuckers cocksucking cocksucks cocksuka cocksukka cockwaffle coffin dodger coital cok cokmuncher coksucka commie condom coochie coochy coon coonnass coons cooter cop some wood coprolagnia coprophilia corksucker cornhole corp whore cox crabs crack cracker crackwhore crack-whore crap crappy creampie cretin crikey cripple crotte cum cum chugger cum dumpster cum freak cum guzzler cumbubble cumdump cumdumpster cumguzzler cumjockey cummer cummin cumming cums cumshot cumshots cumslut cumstain cumtart cunilingus cunillingus cunn cunnie cunnilingus cunntt cunny cunt c-u-n-t cunt vibe bullshit bullshits bullshitted bullturds bum bum boy bumblefuck bumclat bumfuck bummer bung bung hole bunga bunghole bunny fucker bust a load busty butchdike butchdyke butt butt fuck butt plug buttbang butt-bang buttcheeks buttface buttfuck butt-fuck buttfucka buttfucker butt-fucker butthead butthole buttman buttmuch buttmunch buttmuncher butt-pirate buttplug c.0.c.k c.o.c.k. c.u.n.t c0ck c-0-c-k c0cksucker caca cahone camel toe cameltoe camgirl camslut camwhore carpet muncher carpetmuncher cawk cervix chesticle chi-chi man chick with a dick child-fucker chin chinc chincs chink chinky choad choade choc ice chocolate rosebuds chode chodes chota bags cipa circlejerk cl1t cleveland steamer climax clit clit licker clitface clitfuck clitoris clitorus clits clitty clitty litter clogwog clover clamps clunge clusterfuck cnut cocain cocaine cock c-o-c-k cock pocket cock snot cock sucker cockass cockbite cockblock cockburger cockeye cockface cockfucker cockhead cockholster cockjockey cockknocker cockknoker cocklicker cocklover cocklump cockmaster cockmongler cockmongruel cockmonkey cockmunch cockmuncher cocknose cocknugget cocks cockshit cocksmith cocksmoke cocksmoker cocksniffer cocksucer cocksuck cocksuck cocksucked cocksucker cock-sucker cocksuckers cocksucking cocksucks cocksuka cocksukka cockwaffle coffin dodger coital cok cokmuncher coksucka commie condom coochie coochy coon coonnass coons cooter cop some wood coprolagnia coprophilia corksucker cornhole corp whore cox crabs crack cracker crackwhore crack-whore crap crappy creampie cretin crikey cripple crotte cum cum chugger cum dumpster cum freak cum guzzler cumbubble cumdump cumdumpster cumguzzler cumjockey cummer cummin cumming cums cumshot cumshots cumslut cumstain cumtart cunilingus cunillingus cunn cunnie cunnilingus cunntt cunny cunt c-u-n-t cunt   ";

    const arrayOfString = notAllowedWords.split(" ");

    await client.lpush('array1', arrayOfString)
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    httpRedisForArray
}