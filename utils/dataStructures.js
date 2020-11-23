/*  eslint-disable */
import _$capitalize from 'lodash/capitalize'
import _$uppercase from 'lodash/upperCase'

// Parent Category for SubCategories and the data of each node in our
// linked lists
export class Category {
  constructor (slug, list, name = null) {
    this.slug = slug
    if (name === null) {
      this.name =
      _$uppercase(this.slug)
        .split(' ')
        .map(word => _$capitalize(word))
        .join(' ')
    } else {
      this.name = name
    }
    this.subCategories = this.init(list)
    this.data = this.dataObjectInit()
    this.pojo = this.returnPOJO()
    this.articles = []
  }

  init (items) {
    return items.reduce((categoryList, item) => {
      let newSubCat = new SubCategory(item.slug, item.articleList, item.name)
      return [newSubCat, ...categoryList]
    }, [])
  }
  dataObjectInit () {
    let subCats = {}
    for (let cat of this.subCategories) {
      subCats[cat.name] = cat
    }
    return subCats
  }
  reAssign (key, newValue) {
    this[key] = newValue
  }
  queue (category) {
    this.subCategories.unshift(category)
  }
  insert (category) {
    this.subCategories.push(category)
  }
  remove () {
    return this.data.pop()
  }
  spread (...args) {
    this.subCategories = [...this.subCategories, ...args]
  }
  getArticles () {
    return this.subCategories.reduce((catList, category) => [...catList, ...category.articleList], [])
  }
  setArticles (articleList, fullReset = false) {
    if (! fullReset) {
      const prev = this.getArticles()
      this.articles = [...prev, ...articleList]
    } else {
      this.articles = articleList
    }
  }
  returnPOJO () {
    return {
      name: this.name,
      slug: this.slug,
      articles: this.articles,
      subCategories: this.subCategories.map(item => item.returnPOJOSub())
    }
  }
  reset () {
    this.pojo = this.returnPOJO()
    this.data = this.dataObjectInit()
  }
}
// Create Sub Categories that can accept an array of objects
// this will allow us to store our lists in pre created nested
// objects on the front-end if we inject this into Vuex

export class SubCategory {
  constructor (slug, articleList, name = null) {
    this.slug = slug
    if (name === null) {
      this.name =
        _$uppercase(this.slug)
          .split(' ')
          .map(word => _$capitalize(word))
          .join(' ')
    } else {
      this.name = name
    }
    this.articleList = articleList
    this.pojo = this.returnPOJOSub()
  }
  addArticle (articleObject) {
    if (typeof (articleObject) === 'object') {
      this.articleList.push(articleObject)
    } else {
      throw new Error('Invalid Type Must Be Object')
    }
  }
  deleteArticle (articleObject) {
    return this.articleList.pop()
  }
  reAssign (key, newValue) {
    this[key] = newValue
  }
  returnPOJOSub () {
    return {
      name: this.name,
      slug: this.slug,
      articleList: this.articleList
    }
  }
  resetArticleList (articleList) {
    this.articleList = articleList
  }
  resetPOJOSub () {
    this.pojo = this.returnPOJOSub()
  }
}
// Lazy Class To Create A Bunch of Categories, could also be used with json
export class CategoryFactory {
  constructor (list) {
    this.data = this.init(list)
    this.catList = this.returnCatList()
  }
  init (items) {
    return items.reduce((categoryList, item) => {
      categoryList[item.slug] = new Category(item.slug, item.subCategories, item.name)
      return categoryList
    }, {})
  }
  returnPOJOHash () {
    let pojo = {}
    for (let cat in this.data) {
      this.data[cat].reset()
      pojo[cat] = this.data[cat].pojo
    }
    return pojo
  }
  returnCatList () {
    let catList = []
    for (let cat in this.data) {
      this.data[cat].reset()
      catList.push(this.data[cat].pojo)
    }
    return catList
  }
  staticReset () {
    this.pojo = this.returnPOJOHash()
    this.catList = this.returnCatList()
  }
}

// creates default categories with empty articleLists
export const blavityCategories = new CategoryFactory([
  {
    slug: 'news',
    subCategories: [
      { slug: 'business-entrepreneurship', articleList: [], name: 'Business'},
      { slug: 'HBCU-News', articleList: [], name: 'HBCU News' },
      { slug: 'World-News', articleList: [] },
    ]
  },
  {
    slug: 'politics',
    subCategories: [
      { slug: '2020-Election', articleList: [], name: '2020 Election' },
      { slug: 'Social-Justice', articleList: [] },
      { slug: 'Environmentalism', articleList: [] },
      { slug: 'Immigration', articleList: [] },
      { slug: 'Tech-Policy', articleList: [] }
    ]
  },
  {
    slug: 'culture',
    subCategories: [
      { slug: 'Art', articleList: [] },
      { slug: 'Books', articleList: [] },
      { slug: 'music', articleList: [] },
      { slug: 'Dance', articleList: [] }
    ]
  },
  {
    slug: 'lifestyle',
    subCategories: [
      { slug: 'Gender', articleList: [] },
      { slug: 'Wellness', articleList: [] },
      { slug: 'Love-and-Relationships', articleList: [], name: 'Love & Relationships' },
      { slug: 'LGBT', articleList: [], name: 'LGBT' }
    ]
  },
  {
    slug: 'watch',
    subCategories: [
      { slug: 'watch', articleList: [], name: 'Watch' }
    ]
  },
  {
    slug: 'opinion',
    subCategories: [
      { slug: 'op-ed', articleList: [], name: 'Opinion' }
    ],
    name: 'Op-Ed'
  }]
)

export const legacyBlavityCategories = new CategoryFactory([
  {
    slug: 'news',
    subCategories: [
    ]
  },
  {
    slug: 'politics',
    subCategories: [
    ]
  },
  {
    slug: 'opinion',
    subCategories: [

    ]
  }]
)
export const categories = blavityCategories.returnPOJOHash()
export const currentCategory = blavityCategories.catList[0].slug
export const catList = blavityCategories.catList
export const testSponsoredArticle = {
  'image': 'https://res.cloudinary.com/blavity/image/upload/c_crop,g_center,w_auto,q_auto:best,g_south_east,x_0/v1556734303/zjmoq3gtliwtbaxs0ide',
  'author': {
    'name': 'Brianna Rhodes',
    'avatar': 'v1507307607/qoqrgcxuc8romssydwer',
    'id': 1556298762805000
  },
  'published': true,
  'slug': 'notable-world-pride-moments',
  'visibility': 'PUBLIC',
  'publishedAt': 'May 2, 2019',
  'featuredOn': [],
  'publishedOn': [
    'BLAVITY'
  ],
  'title': '4 Notable WorldPride Moments Celebrating Black People',
  'content': "<p>Florida lawmakers <a href=\\\"https://blavity.com/florida-lawmakers-introduced-legislation-threatening-ex-felons-right-to-vote-again\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\">passed a controversial bill in the House</a>&nbsp;which will require ex-felons to repay fines before having their voting rights restored.&nbsp;</p><p>The Associated Press reports <a href=\\\"https://www.cbsnews.com/news/florida-house-passes-bill-giving-ex-felons-voting-rights/\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\">the Republican-led House&nbsp;voted 71-45</a> Wednesday for the legislation&nbsp;that piggybacks off of a constitutional amendment voted on in November which restores voting rights of former felons with the exception of murderers and felony sex offenders&nbsp;be restored.</p><p><a href=\\\"https://blavity.com/an-amendment-on-floridas-ballot-could-allow-more-than-one-million-felony-offenders-to-regain-their-right-to-vote\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\">Amendment 4&nbsp;will restore felons voting rights</a> &quot;upon completion of all terms of sentence including parole or probation.&quot; However, the new bill will require former offenders  to pay fines and&nbsp;restitution to the state first.&nbsp;</p>&ldquo;Today&rsquo;s partisan vote in the House represented a failure to live up to the bipartisan commitment Florida voters showed with the passage of Amendment 4,&rdquo; Neil Volz, the political director of the Florida Rights Restoration Coalition, the group that spearheaded passage of the constitutional amendment, said in a statement to HuffPost. <p>A similar bill is currently being decided upon in the Florida Senate. Critics of both bills believe the repayment of fines will only continue to disenfranchise the newly released.</p><div style=\\\"text-align: center;\\\"><iframe id=\\\"interactApp5ca62aec788d0100149f6659\\\" width=\\\"800\\\" height=\\\"550\\\" style=\\\"border:none;max-width:100%;margin:0;\\\" allowtransparency=\\\"true\\\" frameborder=\\\"0\\\" src=\\\"https://quiz.tryinteract.com/#/5ca62aec788d0100149f6659?method=iframe\\\"></iframe></div><p>As HuffPost notes, the repayment of fines and restitution <a href=\\\"https://www.huffpost.com/entry/florida-felon-disenfranchisement-poll-tax_n_5cc1106ae4b01b6b3efc6ebe\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\">by&nbsp;order of a judge is part of a sentence</a>. The issue for supporters of the amendment is that it does not allow the state to require fines and fees before ex-offenders can vote.&nbsp;</p><p>The bill was sponsored by Tampa Republican&nbsp;Rep. James Grant who claims the proposal will not take away the rights of 1.4 million former offenders. He insisted the bill upholds the state&#39;s constitution.&nbsp;The <a href=\\\"https://www.tallahassee.com/story/news/politics/2019/04/24/florida-house-restores-felons-voting-rights-long-they-pay-first/3560182002/\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\">Tallahassee Democrat reports Grant believes the former offenders disenfranchised themselves</a> when they committed a crime.&nbsp;&nbsp;</p><p>&ldquo;It absolutely includes fines, fees and court costs,&rdquo; Grant told media. &quot;This bill does not disenfranchise anyone.&quot;</p><p>Rep. Ramon Alexander, D-Tallahassee, disagrees.</p><p>&quot;If we&#39;re going to silence them from voting then why do we expect them to pay ad valorem taxes,&quot; said Alexander. &quot;If we think they are not fit to participate in&nbsp;society then why do we let them out of prison.&quot;</p><p>Social justice groups such as the NAACP, American Civil&nbsp;Liberties Union (ACLU) and the Southern Poverty Law Center want the state&#39;s legislature to drop the financial requirements altogether, citing ex-offenders&rsquo; ability to pay them. The new measure may become law, but it is dependent on what happens in the Senate.&nbsp;</p><div><strong><em>Now, check these out:&nbsp;</em></strong></div>\\n<a href=\\\"https://blavity.com/teenage-girl-tragically-dies-after-being-jumped-on-her-way-home-from-school\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\" title=\\\"Teenage Girl Tragically Dies After Being Jumped On Her Way Home From School\\\"> <p>Teenage Girl Tragically Dies After Being Jumped On Her Way Home From School</p> </a>\\n<a href=\\\"https://blavity.com/black-residents-of-south-bend-say-aint-st-changed-since-pete-buttigieg-has-been-mayor\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\" title=\\\"Black Residents Of South Bend Say ‘Ain’t S**t Changed’ Since Pete Buttigieg Has Been Mayor\\\"> <p>Black Residents Of South Bend Say &lsquo;Ain&rsquo;t S**t Changed&rsquo; Since Pete Buttigieg Has Been Mayor</p> </a>\\n<a href=\\\"https://blavity.com/white-man-who-ran-over-interracial-couple-with-his-car-said-he-has-disdain-for-mixed-couples\\\" rel=\\\"noopener noreferrer\\\" target=\\\"_blank\\\" title=\\\"White Man Who Ran Over Interracial Couple With His Car Said He Has 'Disdain' For Mixed Couples\\\"> <p>White Man Who Ran Over Interracial Couple With His Car Said He Has &#39;Disdain&#39; For Mixed Couples</p> </a>\\n<div data-empty=\\\"true\\\"><br></div>",
  'slugs': [
    'notable-world-pride-moments'
  ],
  'tags': [
    'RuPaul',
    'Pose FX',
    'Grace Jones',
    'Teyana Taylor',
    'Amara La Negra',
    'nycpride',
    'world pride',
    'sponsored'
  ],
  'createdAt': 'May 2, 2019',
  'subTitle': 'See how this global celebration recognizes Black people throughout its nearly 20-year history',
  'featuredMedia': {
    'link': 'https://res.cloudinary.com/blavity/image/upload/c_crop,g_center,w_auto,q_auto:best,g_south_east,x_0/v1556734303/zjmoq3gtliwtbaxs0ide',
    'caption': 'Blavity News',
    'id': 1556298762805001,
    'type': 'IMAGE'
  },
  'categories': [
    {
      'name': 'news',
      'slug': 'news'
    },
    {
      'name': 'culture',
      'slug': 'culture'
    }
  ],
  'id': 1556298762805002,
  'excerpt': 'Voting rights for ex-felons have become a hot-button issue for the last few years.',
  'status': 'PUBLISHED',
  'updatedAt': 'April 26, 2019'
}

export const legacyCategories = legacyBlavityCategories.returnPOJOHash()
export const legacyCurrentCategory = legacyBlavityCategories.catList[0].slug
export const legacyCatList = legacyBlavityCategories.catList
export const testArticles = [
  { wp_featuredImage: 'v1559409988/ya2vszojmkvignhocblr',
    slug:
     '2019-wellesley-college-commencement-speaker-anita-hill-spoke-candidly-about-sexual-assault-to-an-all-female-graduating-class',
    title:
     '2019 Wellesley College Commencement Speaker Anita Hill Spoke Candidly About Sexual Assault To An All-Female Graduating Class' },
  { wp_featuredImage: 'v1559413009/kcywxjjrobhkl6dsdfhd',
    slug:
     'arkansas-police-officer-caught-on-video-seemingly-concocting-reason-to-shoot-black-man',
    title:
     'Arkansas Police Officer Caught On Video Seemingly Concocting Reason To Shoot Black Man' },
  { wp_featuredImage: 'v1559404537/u4fgynp9e5t9i3pbt9la',
    slug:
     'maleah-davis-stepfather-confessed-to-killing-her-after-he-was-accused-of-being-gay',
    title:
     'Maleah Davis\' Stepfather Allegedly Confessed To Killing Her After He Was Accused Of Being Gay' },
  { wp_featuredImage: 'v1559243153/vb5uvp3x46cxltb6nuhf',
    slug:
     'man-dies-from-injuries-after-setting-himself-on-fire-near-white-house',
    title:
     'Man Dies From Injuries After Setting Himself On Fire Near White House' },
  { wp_featuredImage: 'v1559346881/o1pvddhpyoxlzofdbuhe',
    slug:
     'three-trans-women-in-pennsylvania-sue-state-to-allow-for-name-changes',
    title:
     'Three Trans Women In Pennsylvania Sue State To Allow For Name Changes' },
  { wp_featuredImage: 'v1559342820/pcktzo5mlvnfywizqmfi',
    slug: 'the-original-gangster-frank-lucas-dead-at-88-years-old',
    title: '‘The Original Gangster’ Frank Lucas Dead At 88 Years Old' },
  { wp_featuredImage: 'v1559342674/pykdnpizk5lkllbooqal',
    slug: 'its-a-whole-new-world-with-these-tweets-of-the-week',
    title: 'It’s A Whole New World With These Tweets Of The Week' },
  { wp_featuredImage: 'v1559340501/l7oy7pqd2swtpe32pn4i',
    slug:
     'woman-who-called-michelle-obama-an-ape-sentenced-to-prison-for-embezzling-funds',
    title:
     'Woman Who Called Michelle Obama An Ape Sentenced To Prison For Embezzling Funds' },
  { wp_featuredImage: 'v1559339653/ju98a1gkd5aygmvhf0fe',
    slug:
     'chamillionaire-teams-with-e-40-to-fund-startups-led-by-women-and-people-of-color',
    title:
     'Chamillionaire Teams With E-40 To Fund Startups Led By Women And People Of Color' },
  { wp_featuredImage: 'v1559337733/deledr66vwvftmyj4nkb',
    slug:
     'the-nba-reportedly-had-a-talk-with-drake-about-his-courtside-behavior-but-he-mustnt-listen-well',
    title:
     'The NBA Reportedly Had A Talk With Drake About His Courtside Behavior But He Mustn\'t Listen Well' },
  { wp_featuredImage: 'v1559333971/qwysxf0wyuo8ysxdsiex',
    slug: '8-self-help-tips-to-become-a-better-you',
    title: '8 Self-Help Tips To Become A Better You' },
  { wp_featuredImage: 'v1559333947/ynfqry2povnvgufgmvgk',
    slug: '9-tools-you-should-use-to-help-achieve-your-personal-goals',
    title: '9 Tools You Should Use To Help Achieve Your Personal Goals' },
  { wp_featuredImage: 'v1559333930/mpqkmrzqfp3ulgpbysyf',
    slug: '7-ways-to-execute-your-dreams',
    title: '7 Ways To Execute Your Dreams' },
  { wp_featuredImage: 'v1558373939/n4tkjte3zfk9qxawt5ms',
    slug: 'project-purple-light',
    title:
     'How Barefoot Is Celebrating Black Women And Inclusivity Through Its Platform ‘Project Purple Light’' },
  { wp_featuredImage: 'v1559319459/ejraok6tbbi6nlqst683',
    slug:
     'details-emerge-in-gruesome-killing-of-21-year-old-south-african-student-naledi-lethoba',
    title:
     'Details Emerge In Gruesome Killing Of 21-Year-Old South African Student Naledi Lethoba' },
  { wp_featuredImage: 'v1559318496/mxti9jpysphn4zpdk5ws',
    slug:
     '10-year-old-girl-raising-money-to-travel-to-europe-after-qualifying-to-compete-in-bmx-competition-in-belgium',
    title:
     '10-Year-Old Girl Raising Money To Travel To Europe After Qualifying To Compete In BMX Competition In Belgium' },
  { wp_featuredImage: 'v1556642962/mgsl4sbklhplcrnn0ov9',
    slug:
     'three-essential-steps-black-millennials-can-take-to-improve-black-heart-health',
    title:
     'Three Essential Steps Black Millennials Can Take To Improve Black Heart Health' },
  { wp_featuredImage: 'v1552359431/hh7wcauhhpqcs5rdmmel',
    slug: '10-helpful-tips-and-resources-for-expecting-black-moms',
    title: '10 Helpful Tips And Resources For Expecting Black Moms' },
  { wp_featuredImage: 'v1559314520/hgp1jwpvsdlj4zlasjse',
    slug:
     'dr-ashley-roxanne-peterson-is-the-youngest-black-osteopathic-doctor-ever',
    title:
     'Dr. Ashley Roxanne Peterson Is The Youngest Black Osteopathic Doctor Ever' },
  { wp_featuredImage: 'v1559314040/ot2p6ro52nbuglkngyjd',
    slug:
     'kenyan-runner-forfeits-race-to-help-another-runner-who-collapsed-on-the-way-to-the-finish-line',
    title:
     'Kenyan Runner Forfeits Race To Help Competitor Who Collapsed On The Way To The Finish Line' },
  { wp_featuredImage: 'v1559312403/sckfum3olqafv4axn5em',
    slug:
     'if-you-play-rap-you-will-not-be-asked-back-a-chicago-nightclub-named-progress-bar-tried-and-failed-to-implement-a-rap-ban',
    title:
     '\'If You Play Rap, You Will Not Be Asked Back\': A Chicago Nightclub Named Progress Bar Tried (And Failed) To Implement A Rap Ban' } ]

export const dataStructures = {
  Category,
  SubCategory,
  CategoryFactory
}
// article hard coded redirects
export const redirects = {
  'biracial-rapper-decides-to-pull-out-of-afrofuture-music-festival-because-of-race-based-ticket-pricing': {
    to: 'afrofuture-fest-changes-its-ticketing-structure-after-reportedly-receiving-threats-from-white-supremacists'
  },
  'r-kellys-daughter-jaah-kelly-explains-why-she-was-fearful-to-come-out-as-transgender-at-14-years-old': {
    to: 'r-kellys-daughter-jaah-kelly-explains-why-she-was-fearful-to-come-out-as-transgender-at-14-years-old-how-her-sexual-identity-has-evolved'
  },
  'the-same-lapd-who-hailed-nipsey-hussle-as-a-peacemaker-has-been-quietly-investigating-him-for-gang-ties':{
    to:'the-same-lapd-that-hailed-nipsey-hussle-as-a-peacemaker-has-been-quietly-investigating-him'
  },
  'beloved-baton-rouge-african-american-museum-founder-discovered-dead-in-car-trunk': {
    to: 'cause-of-death-revealed-in-murder-of-baton-rouge-black-museum-founder-sadie-roberts-joseph'
  },
  'jay-z-is-saying-yes-to-the-super-bowl-in-new-deal-with-the-nfl' : {
    to: 'this-is-a-lie-sources-close-to-colin-kaepernick-slam-reports-he-and-jay-z-conversed-before-the-mogul-closed-a-deal-with-the-nfl'
  }
}
