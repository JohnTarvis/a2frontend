import $ from 'jquery';
import TagList from './TagList';


////////////////////////////////////////////////////////////////////////////////////////////////////


class TagToggler{

    static toggles = ['tag excluded','tag neutral','tag included'];

    static getTags(){
        const tags = $('.tag');
        return tags;
    }

    static getPostCards(){
        const postCards = $('.PostCard');
        return postCards;
    }

    static tagInclusion(tagElement){
        return tagElement.className;
    }

    static tag(tagElement){
        return tagElement.innerHTML;
    }

    static hasTag(postCard,tagElement){
        const tags = postCard.querySelector('.pc-tags').innerHTML;
        const tagArray = tags.split(/\W+/);
        return tagArray.includes(this.tag(tagElement));
    }

    static toggle(tagElement){
        if(!this.isTagElement(tagElement))return;
        const currentClassName = tagElement.className;
        const currentIndex = this.toggles.indexOf(currentClassName);
        const next = currentIndex + 1 > 2 ? 0 : currentIndex + 1;
        const nextClassName = this.toggles[next];
        tagElement.className = nextClassName;
        this.displaySelected();
    }

    static displaySelected(){
        $('.PostCard').show();
        const postCards = this.getPostCards();

        // console.log('postcards======================================',$('.PostCard'));

        const excludedTags = $('.excluded');
        const includedTags = $('.included');
        const neutralTags =  $('.neutral');

        const tags = $('.tag');

        // const neutralTags = [...tags];

        // console.log('exluded=========================',excludedTags);
        // console.log('included========================',includedTags);
        // console.log('tag=============================',tags);



        for(let tag of includedTags){

            for(let postCard of postCards){

                if( !this.hasTag(postCard,tag) )
                    $(postCard).hide();
                else
                    $(postCard).show();

            }
        }

        for(let tag of excludedTags){
            for(let postCard of postCards){
                
                if( !this.hasTag(postCard,tag) )
                    $(postCard).show();
                else
                    $(postCard).hide();

            }
        }


    }

    static showAllPostCards(){
        $('.PostCard').show();
    }

    static isTagElement(tagElement){
        return this.toggles.includes(tagElement.className);
    }


    static shouldBeIncluded(tagElement){
        /**
         * return  -1:exclude --tag
         *          0:neutral --tag included
         *          1:include --tag excluded
         * from this._toggles (indexof - 1) this._DOM_class  
         * for better readability and to simplify code
         */
        return this.toggles.indexOf(tagElement.className) - 1;
    }

    static shouldHaveTag(tagElement){
        return this.toggles.indexOf(tagElement.className) - 1;
    }
    static _hasTag(postCard,tagElement){
        const tags = postCard.querySelector('.pc-tags').innerHTML;
        const tagArray = tags.split(/\W+/);
        return tagArray.includes(this.tag(tagElement)) ? 1 : -1;
    }

    static shouldShow(tagElement,postCard, threshold = -1){
        // const algo = this.hasTag(postCard,tagElement) * this.shouldHaveTag(tagElement);
        // console.log('algo=================================',algo);
        // console.log(`${this.tag(tagElement)} algo at: ${algo}`);
        let back = true;
        if((this.shouldHaveTag(tagElement) === -1) && this.hasTag(postCard,tagElement) === 1){
            back = false;
        } else 
        if((this.shouldHaveTag(tagElement)) === 1 && this.hasTag(postCard,tagElement) === -1){
            back = false;
        } 
        return back;     
    }



    static filterPostCards(tagElement){
        this.showAllPostCards();
        const allPostCards = document.querySelectorAll('.PostCard');
        for(let postCard of allPostCards){

            const shouldShow = this.shouldShow(tagElement,postCard);

            // console.log(`postcard ${postCard.id} shouldShow?: ${shouldShow}`);

            if(shouldShow)
                $(postCard).show();
            else
                $(postCard).hide();

            // console.log(`postcard ${postCard.id} is showing?: ${$(postCard).is(':visible')}`);

        }
    }
};

export default TagToggler;