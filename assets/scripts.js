

  
// Create an Intersection Observer to detect when the section is at the top of the viewport
var section = document.querySelector('.section_case-studies');

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // If the section is at the top of the viewport, add the fade-out class
      section.classList.add('fade-out');
    } else {
      // Remove the fade-out class when the section is no longer at the top
      section.classList.remove('fade-out');
    }
  });
}, {
  threshold: 0.1, // Trigger when 10% of the section is visible
});

observer.observe(section);


// H1 Text effect 

$(document).ready(function () {
    var words = ["graphic designer","graphic designer", "web designer", "UI Designer", "art director", "multidisciplinary designer"];
    var index = 0;
    var typingSpeed = 100;
    var deletingSpeed = 50;
    var pauseTime = 1600;
    var headingRole = $(".heading-role");
    var cursor = $(".cursor");

    function typeWord(word, i) {
        if (i < word.length) {
            headingRole.text(word.substring(0, i + 1));
            setTimeout(function () {
                typeWord(word, i + 1);
            }, typingSpeed);
        } else {
            if (index === words.length - 1) {
                setTimeout(function () {
                    headingRole.css("transition", "color 0.6s ease");
                    headingRole.css("color", "var(--base-color-brand--olive)");

                    setTimeout(function () {
                        cursor.css({
                            transition: "opacity 0.6s ease",
                            opacity: 0
                        });
                    }, 800);
                }, pauseTime);
            } else {
                setTimeout(deleteWord, pauseTime);
            }
        }
    }

    function deleteWord() { // ✅ Now globally available
        var word = words[index];
        var i = word.length;

        function erase() {
            if (i >= 0) {
                headingRole.text(word.substring(0, i));
                i--;
                setTimeout(erase, deletingSpeed);
            } else {
                index++;
                if (index < words.length) {
                    setTimeout(function () {
                        typeWord(words[index], 0);
                    }, typingSpeed);
                }
            }
        }
        erase();
    }

    // Start the animation properly
    headingRole.text(words[0]);
    setTimeout(deleteWord, pauseTime);
});


// Navigation

$(document).ready(function () {
    var navbar = $(".navbar1_container.nav-wrapper");
    var buttonLabels = $(".button-label");
    var logoSvgPaths = $(".navbar1_logo-link svg path"); // Target all path elements inside the SVG
    var buttons = $(".button.is-navbar1-button"); // Target buttons for background transition
    var darkSectionClass = "section_case-studies";

    function checkSection() {
        var navbarHeight = navbar.outerHeight();
        var scrollTop = $(window).scrollTop();
        var isDarkMode = false;

        $(".section_case-studies").each(function () {
            var section = $(this);
            var offsetTop = section.offset().top;
            var sectionHeight = section.outerHeight();
            
            if (scrollTop + navbarHeight >= offsetTop && scrollTop < offsetTop + sectionHeight) {
                isDarkMode = true;
                return false; // Stop checking further sections
            }
            //navbar.addClass("nav-dark"); 
        });

        if (isDarkMode) {
            // Apply dark mode
            navbar.addClass("nav-dark"); 
            navbar.css({
                "background": "rgba(18, 29, 41, 0.85)", // Updated dark mode background
                "border-color": "var(--base-color-brand--slate-dark)", 
                "transition": "background-color 0.5s ease, border-color 0.5s ease",
                "box-shadow": "0 4px 20px #4b5f7240"
            });
            buttonLabels.css({
                "color": "var(--base-color-neutral--white)",
                "transition": "color 0.5s ease"
            });
            logoSvgPaths.css({
                "stroke": "var(--base-color-brand--slate-light)", 
                "transition": "stroke 0.5s ease"
            });
            buttons.css({
                "background-color": "var(--base-color-brand--slate-light)",
                "border": "var(--base-color-brand--slate-light)",
                "transition": "background-color 0.5s ease"
            });
        } else {
            // Apply light mode
            navbar.removeClass("nav-dark"); 
            navbar.css({
                "background": "rgba(255, 255, 255, 0.85)",
                "border-color": "#DCDCDB",
                "transition": "background-color 0.5s ease, border-color 0.5s ease",
                "box-shadow": "0 4px 20px #2c2c2c0f"
            });
            buttonLabels.css({
                "color": "",
                "transition": "color 0.5s ease"
            });
            logoSvgPaths.css({
                "stroke": "", 
                "transition": "stroke 0.5s ease"
            });
            buttons.css({
                "background-color": "var(--base-color-brand--olive)",
                "border": "var(--base-color-brand--olive)",
                "transition": "background-color 0.5s ease"
            });
        }
    }

    $(window).on("scroll", checkSection);
    checkSection(); // Run on page load
});


// Anchor scrolling + Testimonial tab switching

document.addEventListener("DOMContentLoaded", function () {
    var lenis = new Lenis({
        duration: 1.5, // Adjust for smoothness
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    setTimeout(function () {
        if (window.Webflow && window.Webflow.require) {
            window.Webflow.require("ix2").init();
        }
        lenis.start();
    }, 300);

    // 🔹 Dynamic Scroll to Section & Tab Switch
    document.querySelectorAll("[data-scroll-to]").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            let targetId = this.getAttribute("data-scroll-to");
            let targetSection = document.getElementById(targetId);

            // 🔹 Check if this button also needs to switch tabs
            let targetTab = this.getAttribute("data-tab");
            if (targetTab) {
                let tabLink = document.querySelector(`[data-w-tab="${targetTab}"]`);
                if (tabLink) {
                    tabLink.click(); // Switch to the correct tab
                }
            }

            if (targetSection) {
                lenis.scrollTo(targetSection, {
                    duration: 4.5, // Slower scroll
                    easing: (t) => 1 - Math.pow(1 - t, 4),
                    offset: -100 // Adjust spacing
                });
            }
        });
    });
});


// Trailing Cursor

$(document).ready(function () {
    var $cursor = $(".custom-cursor"),
        $cursorText = $(".cursor-text"),
        mouseX = 0, mouseY = 0,
        cursorX = 0, cursorY = 0,
        speed = 0.1;

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        $cursor.css({
            transform: `translate(${cursorX}px, ${cursorY}px)`,
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    $(document).on("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Handle hover interactions
    $(".cursor-hover").on("mouseenter", function () {
        $(".custom-cursor").addClass("cursor-scale");
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("cursor-scale");
    });

    $("[cursor-label]").on("mouseenter", function () {
        var label = $(this).attr("cursor-label");
        $cursorText.text(label);
        
        // Wait for text to update, then adjust cursor width dynamically
        setTimeout(() => {
            var textWidth = $cursorText[0].offsetWidth + 24; // Add padding
            $cursor.css({
                width: textWidth + "px"
            }).addClass("cursor-text-visible");
        }, 10);
        
    }).on("mouseleave", function () {
        $cursor.removeClass("cursor-text-visible").css({
            width: "6px" // Reset width to default
        });
        $cursorText.text(""); 
    });

    // Extra interaction for slider dots
    $(".w-slider-dot").on("mouseenter", function () {
        var label = $(this).attr("cursor-label");
        $cursor.addClass("cursor-focus");
        $cursorText.text(label);
        
        setTimeout(() => {
            var textWidth = $cursorText[0].offsetWidth + 24;
            $cursor.css({
                width: textWidth + "px"
            }).addClass("cursor-text-visible");
        }, 10);

    }).on("mouseleave", function () {
        $cursor.removeClass("cursor-focus cursor-text-visible").css({
            width: "6px"
        });
        $cursorText.text("");
    });

    // Change cursor to white when inside section_case-studies
    $(".section_case-studies").on("mouseenter", function () {
        $cursor.addClass("cursor-white");
    }).on("mouseleave", function () {
        $cursor.removeClass("cursor-white");
    });
    $(document).on("mouseenter", ".nav-dark", function () {
        $(".custom-cursor").addClass("cursor-white");
    }).on("mouseleave", ".nav-dark", function () {
        $(".custom-cursor").removeClass("cursor-white");
    });

});

document.querySelectorAll(".tool-icon").forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
        // Find all path elements inside the SVG
        icon.querySelectorAll("svg path").forEach((path) => {
            // Store the current class value
            path.dataset.originalClass = path.getAttribute("class");

            // Remove the class attribute to hide it
            path.removeAttribute("class");
        });
    });

    icon.addEventListener("mouseleave", () => {
        // Restore the class attribute on mouseleave
        icon.querySelectorAll("svg path").forEach((path) => {
            // Restore the original class
            if (path.dataset.originalClass) {
                path.setAttribute("class", path.dataset.originalClass);
            }
        });
    });
});

$(document).ready(function () {
    // When hovering over .tool-icon, add the 'tooltip' class to .custom-cursor and hide the system cursor
    $(".tool-icon, .has-video").on("mouseenter", function () {
        $(".custom-cursor").addClass("tooltip");
        $(".cursor-carat").css("visibility", "visible");  // Make the .cursor-carat visible
        $(".cursor-text").css("visibility", "visible");  // Hide the .cursor-carat again
        $(this).css("cursor", "none");  // Hide the system cursor
    }).on("mouseleave", function () {
        $(".custom-cursor").removeClass("tooltip");
        $(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(this).css("cursor", "");  // Restore the default system cursor
    });
    
});

$(document).ready(function () {
    $(".has-video").on("mouseenter", function () {
        $(".custom-cursor").addClass("tooltip cursor-text-visible");
    });

    $(".has-video").on("mouseleave", function () {
        $(".custom-cursor").removeClass("tooltip cursor-text-visible");

        var $image = $(this).find(".gallery14_image");
        var $video = $(this).find("video").get(0);

        // Pause the video immediately
        $video.pause();
        

        // Wait 0.5s, then fade in the image over 1s
        setTimeout(function () {
            $image.stop().animate({ opacity: 1 }, 1000, function () {
                // Reset video time **only after** the fade-in is complete
                $video.currentTime = 0;
            });
        }, 500);
    });

    $(".has-video").on("click", function () {
        $(".cursor-text").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".custom-cursor").removeClass("tooltip cursor-text-visible");
        $(".cursor-carat").css("visibility", "hidden");  // Hide the .cursor-carat again
        $(".custom-cursor").css("width", "6px");  // Restore the default system cursor
        $(this).css("cursor", "");  // Restore the default system cursor

        var $image = $(this).find(".gallery14_image");
        var $video = $(this).find("video").get(0);        

        // Fade out image over 1s
        $image.stop().animate({ opacity: 0 }, 1000, function () {
            // Wait 1 second before playing the video
            setTimeout(function () {
                $video.play();
            }, 1000);
        });
    });
});


window.onload = function() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP or ScrollTrigger is not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let cards = gsap.utils.toArray(".layout410_card");

    cards.forEach((card, index) => {
        let prevCard = cards[index - 1]; // Get the previous card
        let isLastCard = index === cards.length - 1; // Check if it's the last card

        // Animate the new card sliding up with a delay and slower transition
        gsap.fromTo(card, 
            { y: 150, opacity: 0 },  
            { 
                y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 40%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Fade out the previous card when the new one enters
        if (prevCard) { 
            gsap.to(prevCard, { 
                opacity: 0, duration: 1.5, ease: "power3.out",
                scrollTrigger: {
                    trigger: card,  
                    start: "top 40%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        // If it's the last card, pin it so it locks in place
        if (isLastCard) {
            ScrollTrigger.create({
                trigger: card,
                start: "top 40%",
                end: "bottom 20%",
                pin: true, // Keeps the last card in place until scrolled past
                pinSpacing: false // Prevents extra white space from being added
            });
        }
    });
};
