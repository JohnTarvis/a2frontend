import $ from 'jquery';
import TagList from './TagList';


////////////////////////////////////////////////////////////////////////////////////////////////////


class TagToggler{

    static toggles = ['tag excluded','tag neutral','tag included'];

    static getTags(){
        const tags = $('.tag');
        return tags;
    }

    static getThreadPreviews(){
        const ThreadPreviews = $('.ThreadPreview');
        return ThreadPreviews;
    }

    static tagInclusion(tagElement){
        return tagElement.className;
    }

    static tag(tagElement){
        return tagElement.innerHTML;
    }

    static hasTag(ThreadPreview,tagElement){
        const tags = ThreadPreview.querySelector('.pc-tags').innerHTML;
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
        $('.ThreadPreview').show();
        const ThreadPreviews = this.getThreadPreviews();

        // console.log('ThreadPreviews======================================',$('.ThreadPreview'));

        const excludedTags = $('.excluded');
        const includedTags = $('.included');
        const neutralTags =  $('.neutral');

        const tags = $('.tag');

        // const neutralTags = [...tags];

        // console.log('exluded=========================',excludedTags);
        // console.log('included========================',includedTags);
        // console.log('tag=============================',tags);



        for(let tag of includedTags){

            for(let ThreadPreview of ThreadPreviews){

                if( !this.hasTag(ThreadPreview,tag) )
                    $(ThreadPreview).hide();
                else
                    $(ThreadPreview).show();

            }
        }

        for(let tag of excludedTags){
            for(let ThreadPreview of ThreadPreviews){
                
                if( !this.hasTag(ThreadPreview,tag) )
                    $(ThreadPreview).show();
                else
                    $(ThreadPreview).hide();

            }
        }


    }

    static showAllThreadPreviews(){
        $('.ThreadPreview').show();
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
    static _hasTag(ThreadPreview,tagElement){
        const tags = ThreadPreview.querySelector('.pc-tags').innerHTML;
        const tagArray = tags.split(/\W+/);
        return tagArray.includes(this.tag(tagElement)) ? 1 : -1;
    }

    static shouldShow(tagElement,ThreadPreview, threshold = -1){
        // const algo = this.hasTag(ThreadPreview,tagElement) * this.shouldHaveTag(tagElement);
        // console.log('algo=================================',algo);
        // console.log(`${this.tag(tagElement)} algo at: ${algo}`);
        let back = true;
        if((this.shouldHaveTag(tagElement) === -1) && this.hasTag(ThreadPreview,tagElement) === 1){
            back = false;
        } else 
        if((this.shouldHaveTag(tagElement)) === 1 && this.hasTag(ThreadPreview,tagElement) === -1){
            back = false;
        } 
        return back;     
    }



    static filterThreadPreviews(tagElement){
        this.showAllThreadPreviews();
        const allThreadPreviews = document.querySelectorAll('.ThreadPreview');
        for(let ThreadPreview of allThreadPreviews){

            const shouldShow = this.shouldShow(tagElement,ThreadPreview);

            // console.log(`ThreadPreview ${ThreadPreview.id} shouldShow?: ${shouldShow}`);

            if(shouldShow)
                $(ThreadPreview).show();
            else
                $(ThreadPreview).hide();

            // console.log(`ThreadPreview ${ThreadPreview.id} is showing?: ${$(ThreadPreview).is(':visible')}`);

        }
    }
};

export default TagToggler;